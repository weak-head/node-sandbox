
class RequestAuthorizer {
    constructor(req) {
        this.request = req;
        this.status  = {
            isAuthorized: false
        };
    }

    requireAdminAccess() {
        if (this.request.auth.isAuth) {
            this.status.isAuthorized = true;
        }
        return this;
    }

    throwIfUnauthorized() {
        if (!this.status.isAuthorized) {
            const error = new Error('Unauthorized');
            error.code = 401;
            error.data = [{
                message: "The user doesn't have any permissions to access the resource"
            }];

            throw error;
        }
    }
}

function forRequest(req) {
    return new RequestAuthorizer(req);
}

function requireAuth(req, res, next) {
    forRequest(req)
        .requireAdminAccess()
        .throwIfUnauthorized();

    next();
}

module.exports = {
    forRequest: forRequest,
    requireAuth: requireAuth
}
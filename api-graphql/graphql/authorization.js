
class RequestAuthorizer {
    constructor(req) {
        this.request = req;
        this.status  = {
            isAuthorized = false
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

            throw error;
        }
    }
}

function forRequest(req) {
    return new RequestAuthorizer(req);
}

module.exports = {
    forRequest: forRequest
}
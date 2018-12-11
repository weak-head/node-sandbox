const fs              = require('fs');
const { buildSchema } = require('graphql');

module.exports = {
    loadSchema: () => {
        const gqlSchema = fs.readFileSync('./graphql/schema/schema.gql', 'utf8');
        return buildSchema(gqlSchema);
    }
}
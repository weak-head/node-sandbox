# api-graphql

```graphql
# create user mutation
mutation {
  createUser(userInput: {
    name: "name",
    email: "email",
    password: "pwd"
  }) {
    name
    email
  }
}
```
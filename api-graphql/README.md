# api-graphql

To run the app:
```bash
npm install
npm start
```

To call the GraphQL API you can use:
* [GraphiQL web ui](http://localhost:8080/graphql)
* curl / postman / whatever http client you like

Here is the skeleton to call the GraphQL API using curl:
```bash
# query
curl -i \
     --request POST \
     --header "Content-Type: application/json" \
     --data '{
                "query": "query { hello { text } }"
             }' \
     http://localhost:8080/graphql

# mutation
curl -i \
     --request POST \
     --header "Content-Type: application/json" \
     --data '{
                "query": "mutation { createUser(userInput: {name: \"name\", email: \"email\", password: \"pwd\"}) { name email }}"
             }' \
     http://localhost:8080/graphql
```

And here are a few examples of GraphQL queries and mutations for the project API:

```graphql
# create user mutation
# this will fail because of invalid email and short password
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
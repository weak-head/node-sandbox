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

To access the protected route, add JWT token to 'Authorization' header:

```bash
# login to get the token
curl -i \
     --request POST \
     --header "Content-Type: application/json" \
     --data '{
                "query": "query { login(email: \"admin@email.domain\", password: \"password\") { token } }"
             }' \
     http://localhost:8080/graphql

# use the token to access the protected resource
curl -i \
     --request POST \
     --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiZW1haWwiOiJhZG1pbkBlbWFpbC5kb21haW4iLCJpYXQiOjE1NDQ4MzA1OTQsImV4cCI6MTU0NDgzNDE5NH0.pbo3KkD1G9Z8uQFgXbad3XQZ2MHNkhb_S8-fJMWxz_U" \
     --header "Content-Type: application/json" \
     --data '{
                "query": "mutation { createTopic(topicInput: { caption: \"The new topic\", content: \"Topic content\" }) { _id caption } }"
             }' \
     http://localhost:8080/graphql
```

And here are a few examples of GraphQL queries and mutations for the project API:

```graphql
# login query
query {
  login(email:"admin@email.domain", password:"password") {
    token
  }
}

# get topics query
query {
  getTopics(author: "any") {
    caption
    sections {
      title
      creator {
        name
      }
      messages {
        text
        creator {
          name
        }
      }
    }
  }
}

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

# create topic mutation
# this will fail without an authorization token
mutation {
  createTopic(topicInput: {
    caption: "The new topic",
    content: "Topic content"
  }) {
    _id
    caption
  }
}
```
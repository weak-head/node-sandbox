# api-rest-jwt

```bash
# start the app
npm start

# signup
curl -i \
     --header "Content-Type:application/json" \
     --request POST \
     --data '{"email":"user@mail.com", "password":"123456"}' \
     http://localhost:8080/api/auth/signup

# login
curl -i \
     --header "Content-Type:application/json" \
     --request POST \
     --data '{"email":"user@mail.com", "password":"123456"}' \
     http://localhost:8080/api/auth/login

```
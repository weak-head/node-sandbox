# security-route

```bash
# start the app
npm start

# login to get the session cookie
curl -i \
     --header "Content-Type:application/json; charset=UTF-8" \
     --request POST \
     --cookie-jar cookies.txt \
     --data '{"login":"admin", "password":"pwd"}' \
     http://localhost:3000/api/login


# access the resource providing the cookie
curl -i \
     --request GET \
     --cookie cookies.txt \
     http://localhost:3000/api/resource1


# access the resource without the cookie
curl -i \
     --request GET \
     http://localhost:3000/api/resource1


# logout
curl -i \
     --request POST \
     http://localhost:3000/api/logout


# access the resource providing the cookie
curl -i \
     --request GET \
     --cookie cookies.txt \
     http://localhost:3000/api/resource1

```
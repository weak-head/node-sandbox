# express-cookie-session

```bash
# start the app and redis
docker-compose up

# get the session cookie
curl -i \
     --header "Content-Type:application/json; charset=UTF-8" \
     --request POST \
     --cookie-jar cookies.txt \
     --data '{"login":"admin", "password":"pwd"}' \
     http://localhost:3000/api/login

# send the session cookie back
curl -i \
     --request GET \
     --cookie cookies.txt \
     http://localhost:3000/api/resource
```
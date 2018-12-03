# express-cookie

```bash
# get the auth cookie
curl -i \
     --header "Content-Type:application/json; charset=UTF-8" \
     --request POST \
     --cookie-jar cookies.txt \
     --data '{"login":"admin", "password":"pwd"}' \
     http://localhost:3000/api/v1/login

# send the auth cookie back
curl -i \
    --request GET \
    --cookie cookies.txt \
    http://localhost:3000/api/v1/resource
```
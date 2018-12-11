# api-websockets

1. Start the app:
```bash
npm install && npm start
```

2. Open a couple of instances of the [web UI (http://localhost:8080)](http://localhost:8080) in a few different browsers

3. Send a few messages using the web UI

4. Send a few messages using curl REST api
```bash
curl -i \
    --request POST \
    --header 'Content-Type: application/json' \
    --data '{"title":"The message title", "body":"Message body"}' \
    http://localhost:8080/messages/create
```
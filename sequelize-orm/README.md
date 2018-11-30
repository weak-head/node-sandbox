# sequelize-orm

```bash
# start detached mssql db
docker-compose up -d

# run the app
npm start

# post some product
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{
            "title": "NES Classic",
            "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Nintendo_CLV-101_20170617.jpg",
            "price": 49.99,
            "description": "Dedicated video game console by Nintendo, which emulates the Nintendo Entertainment System (NES)."
          }' \
  http://localhost:3000/api/product

# get the list of products
curl http://localhost:3000/api/product/all

# get product by id
curl http://localhost:3000/api/product/1
```
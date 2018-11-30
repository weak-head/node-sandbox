# sequelize-orm

> Quick start
```bash
# start detached mssql db
docker-compose up -d

# run the app
npm start

# post the product
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{
            "title": "NES Classic",
            "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Nintendo_CLV-101_20170617.jpg",
            "price": 49.99,
            "description": "Dedicated video game console by Nintendo, which emulates the Nintendo Entertainment System (NES)."
          }' \
  http://localhost:3000/api/products

# get the list of all products
curl http://localhost:3000/api/products

# get the product by id
curl http://localhost:3000/api/products/1

# update the product
curl --header "Content-Type: application/json" \
  --request PUT \
  --data '{
            "title": "NES Classic",
            "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Nintendo_CLV-101_20170617.jpg",
            "price": 69.99,
            "description": "Dedicated video game console by Nintendo."
          }' \
  http://localhost:3000/api/products/1

# get the updated product
curl http://localhost:3000/api/products/1

# delete the product
curl --request DELETE http://localhost:3000/api/products/1

# get the list of products
curl http://localhost:3000/api/products
```

> API summary
```
POST   /api/products
GET    /api/products
GET    /api/products/{id}
PUT    /api/products/{id}
DELETE /api/products/{id}
```
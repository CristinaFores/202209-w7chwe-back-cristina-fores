## Red social

### Users

POST /register { name, password, image? }
POST /login { name, password }
PUT /user { name, password, image }
POST /user/addFriend/:id _ Remove from enemies
POST /user/addEnemy/:id _ Remove from friends

GET /users { filters: [friends, enemies] }
GET /me

![planing.png](planing-red-social.png)

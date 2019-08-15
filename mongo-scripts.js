use admin

db.createUser(
  {
    user: "admin",
    pwd: "admin",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)

 db.messages.find()
 db.messages.remove( {"_id": ObjectId("5d5568287a15174f15d96286")})
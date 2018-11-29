

module.exports = {

    SECRET_KEY:process.env.SECRET_KEY || "cAt6O0OA6+NKWHhYWI24yTu/8eE=",
    SECRET_KEY_STRIPE:process.env.SECRET_KEY || "sk_test_35aCzDALmc3WRugrbLqxasDZ",
    SUBSCRIPTIONS_TYPES:{
        "GOLD":"plan_E1XatQGTuzuJUd",
        "PREMIUM":"plan_E1B0UOJ1PBUEGj"
    },
    MONGO_URI:'mongodb://prueba:jorge123@cluster0-shard-00-00-yifvw.mongodb.net:27017,cluster0-shard-00-01-yifvw.mongodb.net:27017,cluster0-shard-00-02-yifvw.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
    TEST_MONGO_URI:"mongodb://prueba:prueba12@ds161391.mlab.com:61391/netflix-test"


}
const { MongoClient } = require("mongodb");

module.exports = {
  setupDB() {
    let connection;
    let db;

    beforeAll(async () => {
      connection = await MongoClient.connect(process.env.MONGODB_URL, {
        dbName: "test",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      db = await connection.db();
    });

    afterAll(async () => {
      await db.collection("test").deleteMany({});
      await connection.close();
    });
  },
};

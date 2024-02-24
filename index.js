const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Sequelize } = require("sequelize");
const router = require("./router/index");
const userRouter = require("./router/index");

const sequelize = new Sequelize("admin", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
});

const User = require("./models/user-model")(sequelize, Sequelize);
const Token = require("./models/token-model")(sequelize, Sequelize, User);

const testConnection = () => {
  try {
    sequelize.authenticate();
  } catch (e) {
    console.log("Ошибка " + e);
  }
};

const syncModels = (models) => {
  models.forEach(async (model) => {
    model
      .sync({ alter: true })
      .then(() => console.log(`Таблица ${model.name} успешно создан`))
      .catch((err) => console.log("Ошибка синхронизации:", err));
  });
};

testConnection();
syncModels([User, Token]);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use("/user_api", userRouter);

const start = async () => {
  app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
};

start();

module.exports = { sequelize, User, Token };

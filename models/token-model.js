module.exports = (sequelize, Sequelize, User) => {
  const Token = sequelize.define("token", {
    refreshToken: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Token.hasOne(User, { foreignKey: "userId" });
  User.belongsTo(Token, { foreignKey: "userId" });

  return Token;
};

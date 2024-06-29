module.exports = (db, DataTypes) =>
  db.sequelize.define(
    "special_product",
    {
      special_product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      }
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false,
    }
  );

module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('place', {
    name: DataTypes.STRING,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    favsCount: DataTypes.INTEGER,
    pinnedCount: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: (models) => {
        Place.belongsToMany(models.user,
          { through: { model: 'userPlace', unique: false } },
          { as: 'user', foreignKey: { name: 'userId', allowNull: false } }
        );
        Place.hasMany(models.fav);
      },
    },
  });
  return Place;
};

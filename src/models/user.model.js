const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db.config'); // Adjust the path based on your project structure
const { ROLES } = require('../configs/constants');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ARRAY(DataTypes.ENUM(ROLES.ADMIN, ROLES.USER, ROLES.GUEST)),
    allowNull: false,
    defaultValue: []
  },
  verify: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  // created_at: {
  //   type: DataTypes.DATE,
  //   allowNull: false,
  // },
}, {
  tableName: 'users',
  timestamps: true, // Disable Sequelize's default timestamp columns
});

// Synchronize the model with the database to create the table
sequelize.sync()
  .then(() => {
    console.log('Table "users" created successfully');
  })
  .catch(error => {
    console.error('Error creating "users" table:', error);
  });

module.exports = User;

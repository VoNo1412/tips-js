const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db.config'); // Adjust the path based on your project structure

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user', 'guest'), // Add your role values
    allowNull: false,
  },
  permission: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: false, // Disable Sequelize's default timestamp columns
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

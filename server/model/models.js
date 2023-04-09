import { DataTypes } from 'sequelize';
import sequelize from './database.js';

export const Users = sequelize.define('users', {
id: {
type: DataTypes.INTEGER,
primaryKey: true,
autoIncrement: true,
allowNull: false,
},
username: {
type: DataTypes.STRING(45),
allowNull: false,
},
email: {
type: DataTypes.STRING(255),
allowNull: false,
},
password: {
type: DataTypes.STRING(255),
allowNull: false,
},
}, {
timestamps: false, // disable createdAt and updatedAt fields
});

export const Photos = sequelize.define('photos', {
id: {
type: DataTypes.INTEGER,
primaryKey: true,
autoIncrement: true,
allowNull: false,
},
img: {
type: DataTypes.STRING(255),
allowNull: false,
},
date: {
type: DataTypes.DATE,
allowNull: true,
},
cat: {
type: DataTypes.STRING(45),
allowNull: false,
},
title: {
type: DataTypes.STRING(45),
allowNull: false,
},
}, {
timestamps: false, // disable createdAt and updatedAt fields
});

// Create a foreign key relationship between photos and users tables
Photos.belongsTo(Users, { foreignKey: 'uid' });
Users.hasMany(Photos, { foreignKey: 'uid' });
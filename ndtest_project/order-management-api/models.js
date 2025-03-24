const { DataTypes } = require('sequelize');
const db = require('./database');  // Adjust the path if necessary

const Order = db.define('Order', {
    item: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = {Order};

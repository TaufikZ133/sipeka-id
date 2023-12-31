import {Sequelize} from "sequelize";
import db from "../config/Database.js"

const { DataTypes } = Sequelize;

const Admin = db.define('admin',{
    nama:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    token:{
        type: DataTypes.STRING
    },
    foto:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});

export default Admin;
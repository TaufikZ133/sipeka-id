import {Sequelize} from "sequelize";
import db from "../config/Database.js"

const { DataTypes } = Sequelize;

const Dokumen = db.define('dokumen',{
    nama_dokumen:{
        type: DataTypes.STRING
    },
    jenis_dokumen:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});

export default Dokumen;
import {Sequelize} from "sequelize";
import db from "../config/Database.js"

const { DataTypes } = Sequelize;

const MasterPenggajian = db.define('masterPenggajian',{
    jabatan:{
        type: DataTypes.STRING
    },
    gaji_perbulan:{
        type: DataTypes.STRING
    },
    gaji_perhari:{
        type: DataTypes.STRING
    },
    tunjangan_tetap:{
        type: DataTypes.STRING
    },
    tunjangan_tidak_tetap:{
        type: DataTypes.STRING
    },
    pph21:{
        type: DataTypes.STRING
    },
    denda:{
        type: DataTypes.STRING
    },
    pendapatan_bersih:{
        type: DataTypes.STRING
    },
    
},{
    freezeTableName:true
});

export default MasterPenggajian;
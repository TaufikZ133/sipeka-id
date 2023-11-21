import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Karyawan from "./Karyawan.js";

const { DataTypes } = Sequelize;

const PresensiKaryawan = db.define('presensiKaryawan', {
    nama:{
        type: DataTypes.STRING
    },
    jenis_presensi:{
        type: DataTypes.ENUM('hadir','tidak hadir','izin'),
        defaultValue: 'tidak hadir'
    },
    keterangan:{
        type: DataTypes.STRING
    },
},{
    freezeTableName:true
});
PresensiKaryawan.belongsTo(Karyawan, {
    foreignKey: "presensiId",
    as: "kehadiran",
  });

export default PresensiKaryawan;
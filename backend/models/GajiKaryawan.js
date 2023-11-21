import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Karyawan from "./Karyawan.js";

const { DataTypes } = Sequelize;

const GajiKaryawan = db.define(
  "gajiKaryawan",
  {
    bulan_penggajian: {
      type: DataTypes.STRING,
    },
    gaji_pokok: {
      type: DataTypes.STRING,
    },
    tunjangan_tetap: {
      type: DataTypes.STRING,
    },
    tunjangan_tidak_tetap: {
      type: DataTypes.STRING,
    },
    total_pendapatan: {
      type: DataTypes.STRING,
    },
    pph21: {
      type: DataTypes.STRING,
    },
    denda_pelanggaran: {
      type: DataTypes.STRING,
    },
    total_pengurangan: {
      type: DataTypes.STRING,
    },
    penerimaan_bersih: {
      type: DataTypes.STRING,
    },
    keterangan: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
GajiKaryawan.belongsTo(Karyawan, {
  foreignKey: "gajiId",
  as: "slipgaji",
});

export default GajiKaryawan;

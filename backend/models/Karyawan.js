import {Sequelize} from "sequelize";
import db from "../config/Database.js"

const { DataTypes } = Sequelize;

const Karyawan = db.define('karyawan',{
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
    nik:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.STRING
    },
    jabatan:{
        type: DataTypes.STRING
    },
    departemen:{
        type: DataTypes.STRING
    },
    jenis_kelamin:{
        type: DataTypes.STRING
    },
    tempat_tanggal_lahir:{
        type: DataTypes.STRING
    },
    kewarganegaraan:{
        type: DataTypes.STRING
    },
    nomer_hp:{
        type: DataTypes.STRING
    },
    agama:{
        type: DataTypes.STRING
    },
    golongan_darah:{
        type: DataTypes.STRING
    },
    alamat:{
        type: DataTypes.STRING
    },
    kota:{
        type: DataTypes.STRING
    },
    provinsi:{
        type: DataTypes.STRING
    },
    kode_pos:{
        type: DataTypes.STRING
    },
    asal_sd:{
        type: DataTypes.STRING
    },
    asal_smp:{
        type: DataTypes.STRING
    },
    asal_sma:{
        type: DataTypes.STRING
    },
    perguruan_tinggi:{
        type: DataTypes.STRING
    },
    jurusan_prodi:{
        type: DataTypes.STRING
    },
    nama_ayah:{
        type: DataTypes.STRING
    },
    nama_ibu:{
        type: DataTypes.STRING
    },
    nama_suamiistri:{
        type: DataTypes.STRING
    },
    jumlah_anak:{
        type: DataTypes.STRING
    },
    saudara_kandung:{
        type: DataTypes.STRING
    },
    telepon_keluarga:{
        type: DataTypes.STRING
    },
    pas_foto:{
        type: DataTypes.STRING
    },
    foto_ktp:{
        type: DataTypes.STRING
    },
    foto_kk:{
        type: DataTypes.STRING
    },
    foto_ijazah:{
        type: DataTypes.STRING
    },
},{
    freezeTableName:true
});

export default Karyawan;
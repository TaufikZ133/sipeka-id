import PresensiKaryawan from "../models/PresensiKaryawan.js";
import Karyawan from "../models/Karyawan.js";

//Mendapat Semua Data Presensi --(GET)
export const getPresensi = async(req, res) => {
    try {
        const response = await PresensiKaryawan.findAndCountAll({
            include: [
                { model: Karyawan, as: "kehadiran" }
            ]
        });
        res.json(response);
    } catch (error) {
        console.log(error)
    }
};

//Mendapatkan Satu Data Presensi By PrimaryKey --(GET)
export const getPresensiById = async (req, res) => {
    try {  
        const response = await PresensiKaryawan.findOne({
            where:{
                id: req.params.id
            }
        });
        res.json(response);   
    } catch (error) {
        console.log(error);
    }
}

//Mendapatkan Satu Data Presensi By ForeignKey --(POST)
export const getPresensiForeign = async (req, res) => {
    try {
        const response = await PresensiKaryawan.findAndCountAll({
            where:{
                presensiId: req.body.presensiId
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

//Menambahkan Data Presensi --(POST)
export const addPresensi = async (req, res) => {
    const {nama,jenis_presensi,keterangan,presensiId} = req.body;
    try {
        const response = await PresensiKaryawan.create({
            nama,
            jenis_presensi,
            keterangan,
            presensiId,
        });
        res.json({msg: "Tambah Presensi Berhasil",data:response});
    } catch (error) {
        console.log(error);
    }
}

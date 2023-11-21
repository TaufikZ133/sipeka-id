import MasterPenggajian from "../models/MasterPenggajian.js";

//Mendapat Semua Data Master Gaji --(GET)
export const getMasterGaji = async(req, res) => {
    try {
        const response = await MasterPenggajian.findAndCountAll();
        res.json(response);
    } catch (error) {
        console.log(error)
    }
};

//Mendapatkan Satu Data Master Gaji By PrimaryKey --(GET)
export const getMasterGajiById = async (req, res) => {
    try {  
        const response = await MasterPenggajian.findOne({
            where:{
                id: req.params.id
            }
        });
        res.json(response);   
    } catch (error) {
        console.log(error);
    }
};

//Menambahkan Data Master Gaji --(POST)
export const addMasterGaji = async (req, res) => {
    const {jabatan,gaji_perbulan,gaji_perhari,tunjangan_tetap,tunjangan_tidak_tetap,pph21,denda,pendapatan_bersih} = req.body;
    try {
        const response = await MasterPenggajian.create({
            jabatan,
            gaji_perbulan,
            gaji_perhari,
            tunjangan_tetap,
            tunjangan_tidak_tetap,
            pph21,
            denda,
            pendapatan_bersih,
        });
        res.json(response);
    } catch (error) {
        console.log(error);
    }
};

//Melakukan Update Data Master Gaji --(PATCH)
export const patchMasterGaji = async (req, res) => {
    const response = await MasterPenggajian.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!response) return res.status(404).json({ msg: "Data Master Gaji Tidak Ada" });
    const {jabatan,gaji_perbulan,gaji_perhari,tunjangan_tetap,tunjangan_tidak_tetap,pph21,denda,pendapatan_bersih} = req.body;
    try {
      await MasterPenggajian.update(
        {
          jabatan,
          gaji_perbulan,
          gaji_perhari,
          tunjangan_tetap,
          tunjangan_tidak_tetap,
          pph21,
          denda,
          pendapatan_bersih,
        },
        {
          where: {
            id: response.id,
          },
        }
      );
      res.status(200).json({ msg: "Data Master Gaji Berhasil diupdate" });
    } catch (error) {
      console.log(error);
      res.status(404).json({ msg: "error", error });
    }
};

//Menghapus Data Dokumen --(DELETE)
export const deleteMasterGaji = async (req, res) => {
    const response = await MasterPenggajian.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!response)
      return res.status(404).json({ msg: "Data Master Gaji Tidak Ditemukan" });
    try {
      await MasterPenggajian.destroy({
        where: {
          id: response.id,
        },
      });
      res.status(200).json({ msg: "Data Master Gaji Berhasil Dihapus" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
};
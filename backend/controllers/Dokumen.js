import Dokumen from "../models/Dokumen.js";

//Mendapatkan Semua Data Dokumen --(GET)
export const getDokumen = async (req, res) => {
  try {
    const response = await Dokumen.findAll();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

//Mendapatkan Satu Data Dokumen By PrimaryKey --(GET)
export const getDokumenById = async (req, res) => {
  try {
    const response = await Dokumen.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

//Menambahkan Data Dokumen --(POST)
export const addDokumen = async (req, res) => {
  const { nama_dokumen, jenis_dokumen } = req.body;
  try {
    const response = await Dokumen.create({
      nama_dokumen,
      jenis_dokumen,
    });
    res.json({ msg: "Tambah Dokumen Berhasil", data: response });
  } catch (error) {
    console.log(error);
  }
};

//Menghapus Data Dokumen --(DELETE)
export const deleteDokumen = async (req, res) => {
  const response = await Dokumen.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!response)
    return res.status(404).json({ msg: "Data Dokumen Tidak Ditemukan" });
  try {
    await Dokumen.destroy({
      where: {
        id: response.id,
      },
    });
    res.status(200).json({ msg: "Data Dokumen Berhasil Dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//Melakukan Update Data Dokumen --(PATCH)
export const patchDokumen = async (req, res) => {
  const response = await Dokumen.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!response) return res.status(404).json({ msg: "Data Dokumen Tidak Ada" });
  const { nama_dokumen, jenis_dokumen } = req.body;
  try {
    await Dokumen.update(
      {
        nama_dokumen,
        jenis_dokumen,
      },
      {
        where: {
          id: response.id,
        },
      }
    );
    res.status(200).json({ msg: "Data Dokumen Berhasil diupdate" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "error", error });
  }
};

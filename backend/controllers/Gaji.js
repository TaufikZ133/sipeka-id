import GajiKaryawan from "../models/GajiKaryawan.js";
import Karyawan from "../models/Karyawan.js";

//Mendapat Semua Data Gaji --(GET)
export const getGaji = async (req, res) => {
  try {
    const response = await GajiKaryawan.findAndCountAll({
      include: [{ model: Karyawan, as: "slipgaji" }],
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

//Mendapatkan Satu Data Gaji By PrimaryKey --(GET)
export const getGajiById = async (req, res) => {
  try {
    const response = await GajiKaryawan.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

//Mendapatkan Satu Data Gaji By ForeignKey --(POST)
export const getGajiForeign = async (req, res) => {
  try {
    const response = await GajiKaryawan.findAndCountAll({
      where: {
        gajiId: req.body.gajiId,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

//Menambahkan Data Gaji --(POST)
export const addGaji = async (req, res) => {
  const {
    bulan_penggajian,
    gaji_pokok,
    tunjangan_tetap,
    tunjangan_tidak_tetap,
    total_pendapatan,
    pph21,
    denda_pelanggaran,
    total_pengurangan,
    penerimaan_bersih,
    keterangan,
    gajiId,
  } = req.body;
  try {
    const response = await GajiKaryawan.create({
      bulan_penggajian,
      gaji_pokok,
      tunjangan_tetap,
      tunjangan_tidak_tetap,
      total_pendapatan,
      pph21,
      denda_pelanggaran,
      total_pengurangan,
      penerimaan_bersih,
      keterangan,
      gajiId,
    });
    res.json({ msg: "Tambah Gaji Berhasil", data: response });
  } catch (error) {
    console.log(error);
  }
};

//Melakukan Update Data Gaji --(PATCH)
export const patchGaji = async (req, res) => {
  const response = await GajiKaryawan.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!response) return res.status(404).json({ msg: "Data Gaji Tidak Ada" });
  const {
    nama,
    nik,
    jabatan,
    departemen,
    bulan_penggajian,
    gaji_pokok,
    lembur,
    tunjangan,
    total_pendapatan,
    pph21,
    bpjs,
    denda_pelanggaran,
    total_pengurangan,
    penerimaan_bersih,
    keterangan,
  } = req.body;
  try {
    await GajiKaryawan.update(
      {
        nama,
        nik,
        jabatan,
        departemen,
        bulan_penggajian,
        gaji_pokok,
        lembur,
        tunjangan,
        total_pendapatan,
        pph21,
        bpjs,
        denda_pelanggaran,
        total_pengurangan,
        penerimaan_bersih,
        keterangan,
      },
      {
        where: {
          id: response.id,
        },
      }
    );
    res.status(200).json({ msg: "Data Gaji Berhasil diupdate" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "error", error });
  }
};

//Menghapus Data Gaji --(DELETE)
export const deleteGaji = async (req, res) => {
  const response = await GajiKaryawan.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!response)
    return res.status(404).json({ msg: "Data Gaji Tidak Ditemukan" });
  try {
    await GajiKaryawan.destroy({
      where: {
        id: response.id,
      },
    });
    res.status(200).json({ msg: "Data Gaji Berhasil Dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//Menambahkan Bulk Data Gaji --(POST)
export const addBulkGaji = async (req, res) => {
  const arrayGaji = req.body;
  arrayGaji.forEach(async (gaji) => {
    try {
      await GajiKaryawan.create({
        nama: gaji.nama,
        nik: gaji.nik,
        jabatan: gaji.jabatan,
        departemen: gaji.departemen,
        bulan_penggajian: gaji.bulan_penggajian,
        gaji_pokok: gaji.gaji_pokok,
        lembur: gaji.lembur,
        tunjangan: gaji.tunjangan,
        total_pendapatan: gaji.total_pendapatan,
        pph21: gaji.pph21,
        bpjs: gaji.bpjs,
        denda_pelanggaran: gaji.denda_pelanggaran,
        total_pengurangan: gaji.total_pengurangan,
        penerimaan_bersih: gaji.penerimaan_bersih,
        keterangan: gaji.keterangan,
        gajiId: gaji.gajiId,
      });
      res.status(200);
    } catch (error) {
      console.log(error);
    }
  });
};

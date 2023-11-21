import Karyawan from "../models/Karyawan.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

//Verifikasi token milik karyawan --(GET)
export const Cookie = async (req, res) => {
  try {
    const Cookie = req.cookies.accessToken;
    if (!Cookie) return res.sendStatus(404);
    const response = await Karyawan.findAll({
      where: {
        token: Cookie,
      },
    });
    if (!response[0]) return res.sendStatus(204);
    res.json(Cookie);
  } catch (error) {
    console.log(error);
  }
};

//Mendapatkan Semua Data Karyawan --(GET)
export const getKaryawan = async (req, res) => {
  try {
    const response = await Karyawan.findAndCountAll({
      attributes: [
        "id",
        "nama",
        "email",
        "nik",
        "jabatan",
        "departemen",
        "nomer_hp",
        "pas_foto",
      ],
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

//Mendapatkan satu data karyawan By ID --(GET)
export const GetKaryawanById = async (req, res) => {
  try {
    const response = await Karyawan.findOne({
      attributes: [
        "id",
        "nama",
        "email",
        "nik",
        "status",
        "jabatan",
        "departemen",
        "jenis_kelamin",
        "tempat_tanggal_lahir",
        "kewarganegaraan",
        "nomer_hp",
        "agama",
        "golongan_darah",
        "alamat",
        "kota",
        "provinsi",
        "kode_pos",
        "asal_sd",
        "asal_smp",
        "asal_sma",
        "perguruan_tinggi",
        "jurusan_prodi",
        "nama_ayah",
        "nama_ibu",
        "nama_suamiistri",
        "jumlah_anak",
        "saudara_kandung",
        "telepon_keluarga",
        "pas_foto",
        "foto_ktp",
        "foto_kk",
        "foto_ijazah",
        "createdAt",
      ],
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

//Melakukan Register Akun Karyawan --(POST)
export const RegisterKaryawan = async (req, res) => {
  const { nama, email, password, confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Konfirm Password Tidak Sesuai" });
  if (email.length == 0 || password.length == 0 || nama.length == 0)
    return res.status(400).json({ msg: "Input Tidak Boleh Ada yang Kosong" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Karyawan.create({
      email: email,
      nama: nama,
      password: hashPassword,
    });
    res.status(200).json({ msg: "Register Akun Berhasil Dilakukan" });
  } catch (error) {
    res.status(404).json({ msg: "Register Akun Gagal Dilakukan" });
  }
};

//Login Akun Karyawan --(POST)
export const LoginKaryawan = async (req, res) => {
  try {
    const karyawan = await Karyawan.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, karyawan[0].password);
    if (!match)
      return res
        .status(400)
        .json({ msgPsw: "Password Yang Anda Masukan Salah" });
    const karyawanId = karyawan[0].id;
    const nama = karyawan[0].nama;
    const email = karyawan[0].email;
    const accessToken = jwt.sign(
      { karyawanId, nama, email },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "30m",
      }
    );
    await Karyawan.update(
      { token: accessToken },
      {
        where: {
          id: karyawanId,
        },
      }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Email yang Anda Masukan Belum Terdaftar" });
  }
};

//Logout Akun Karyawan --(DELETE)
export const LogoutKaryawan = async (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.status(400).json({ msg: "You Have No Tokens" });
  const response = await Karyawan.findAll({
    where: {
      token: accessToken,
    },
  });
  if (!response[0]) return res.sendStatus(204);
  const karyawanId = response[0].id;
  await Karyawan.update(
    { token: null },
    {
      where: {
        id: karyawanId,
      },
    }
  );
  res.clearCookie("accessToken");
  return res.sendStatus(200);
};

//Mendapatkan satu data karyawan By Token --(POST)
export const getKaryawanSatu = async (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.status(400).json({ msg: "You Have No Tokens" });
  const response = await Karyawan.findAll({
    where: {
      token: accessToken,
    },
  });
  if (!response[0]) return res.sendStatus(204);
  const karyawanId = response[0].id;
  const karyawan = await Karyawan.findOne({
    attributes: ["id", "nama", "email"],
    where: {
      id: karyawanId,
    },
  });
  res.status(200).json({ karyawan });
};

//Melakukan Reset Password Akun Karyawan --(POST)
export const ForgetPassword = async (req, res) => {
  try {
    const karyawan = await Karyawan.findAll({
      attributes: ["id", "email"],
      where: {
        email: req.body.email,
      },
    });
    if (!karyawan[0])
      return res.status(404).json({ msg: "Email Anda Tidak Ditemukan" });
    const karyawanId = karyawan[0].id;
    const karyawanEmail = karyawan[0].email;
    const password = (Math.random() + 1).toString(36).substring(7);
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      await Karyawan.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id: karyawanId,
          },
        }
      );
      res.json(password);
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "sembarang1412@gmail.com",
            pass: "lzltetcdiocbjgcv",
          },
        });

        const mailOptions = {
          from: "SIMKA.OFFICIAL <example@nodemailer.com>",
          to: `${karyawanEmail}`,
          subject: "Reset Your Password",
          text: `Selamat anda telah berhasil melakukan reset password. Berikut merupakan Password anda yang baru : ${password}`,
          html: `<p>Selamat anda telah berhasil melakukan reset password. Berikut merupakan Password anda yang baru : ${password}</p>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
    res.status(200);
  } catch (error) {
    console.log(error);
  }
};

//Merubah dan Mengupdate Data Diri Karyawan --(PATCH)
export const patchKaryawan = async (req, res) => {
  const response = await Karyawan.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!response)
    return res.status(404).json({ msg: "Data Karyawan Tidak Ada" });
  const {
    nama,
    nik,
    status,
    jabatan,
    departemen,
    jenis_kelamin,
    tempat_tanggal_lahir,
    kewarganegaraan,
    nomer_hp,
    agama,
    golongan_darah,
    alamat,
    kota,
    provinsi,
    kode_pos,
    asal_sd,
    asal_smp,
    asal_sma,
    perguruan_tinggi,
    jurusan_prodi,
    nama_ayah,
    nama_ibu,
    nama_suamiistri,
    jumlah_anak,
    saudara_kandung,
    telepon_keluarga,
    pas_foto,
    foto_ktp,
    foto_kk,
    foto_ijazah,
  } = req.body;
  try {
    await Karyawan.update(
      {
        nama,
        nik,
        status,
        jabatan,
        departemen,
        jenis_kelamin,
        tempat_tanggal_lahir,
        kewarganegaraan,
        nomer_hp,
        agama,
        golongan_darah,
        alamat,
        kota,
        provinsi,
        kode_pos,
        asal_sd,
        asal_smp,
        asal_sma,
        perguruan_tinggi,
        jurusan_prodi,
        nama_ayah,
        nama_ibu,
        nama_suamiistri,
        jumlah_anak,
        saudara_kandung,
        telepon_keluarga,
        pas_foto,
        foto_ktp,
        foto_kk,
        foto_ijazah,
      },
      {
        where: {
          id: response.id,
        },
      }
    );
    res.status(200).json({ msg: "Data Karaywan Berhasil diupdate" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "error", error });
  }
};

//Upload Foto Karyawan ke Server (POST)
export const uploadFotoKaryawan = async (req, res) => {
  let finalImageURL = "images" + "/" + req.file.filename;
  res.json({ status: "succes", image: finalImageURL });
};

//Menghapus Satu Karyawan --(DELETE)
export const deleteKaryawan = async (req, res) => {
  const response = await Karyawan.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!response)
    return res.status(404).json({ msg: "Data Karyawan Tidak Ditemukan" });
  try {
    await Karyawan.destroy({
      where: {
        id: response.id,
      },
    });
    res.status(200).json({ msg: "Data Karyawan Berhasil Dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//Mengubah Password Karyawan -- (PATCH)
export const patchPassword = async (req, res) => {
  const karyawan = await Karyawan.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!karyawan)
    return res.status(404).json({ msg: "Karyawan Tidak Ditermukan" });
  const { oldPassword, password } = req.body;
  const salt = await bcrypt.genSalt();
  const oldPasswordValid = bcrypt.compareSync(oldPassword, karyawan.password);
  if (oldPasswordValid) {
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      await Karyawan.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id: karyawan.id,
          },
        }
      );
      res.json({ msg: "Password Anda Berhasil diupdate" });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(422).json({ msg: "Password lama tidak benar!" });
  }
};

//Mendapatkan Satu Data Karyawan By Jabatan --(POST)
export const getKaryawanByJabatan = async (req, res) => {
  try {
    const response = await Karyawan.findAll({
      where: {
        jabatan: req.body.jabatan,
      },
      attributes: [
        "id",
        "nama"
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

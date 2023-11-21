import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Melakukan Register Akun Admin --(POST)
export const RegisterAdmin = async (req, res) => {
    const { nama,email, password, confPassword } = req.body;
    if (password !== confPassword)
      return res
        .status(400)
        .json({ msg: "Password dan Konfirm Password Tidak Sesuai" });
    if (nama.length == 0 || email.length == 0 || password.length == 0)
      return res.status(400).json({ msg: "Input Tidak Boleh Ada yang Kosong" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      await Admin.create({
        nama: nama,
        email: email,
        password: hashPassword,
      });
      res.status(200).json({ msg: "Register Akun Berhasil Dilakukan" });
    } catch (error) {
      res.status(404).json({ msg: "Register Akun Gagal Dilakukan" });
    }
  };

//Login Akun Admin --(POST)
export const LoginAdmin = async (req, res) => {
    try {
      const admin = await Admin.findAll({
        where: {
          email: req.body.email,
        },
      });
      const match = await bcrypt.compare(req.body.password, admin[0].password);
      if (!match)
        return res
          .status(400)
          .json({ msgPsw: "Password Yang Anda Masukan Salah" });
      const adminId = admin[0].id;
      const nama = admin[0].nama;
      const email = admin[0].email;
      const accessToken = jwt.sign(
        { adminId, nama, email },
        process.env.ADMIN_TOKEN,
        {
          expiresIn: "30m",
        }
      );
      await Admin.update(
        { token: accessToken },
        {
          where: {
            id: adminId,
          },
        }
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 1 * 60 * 60 * 1000,
      });
      res.status(200).json({ accessToken });
    } catch (error) {
      res.status(404).json({msg:"Email yang Anda Masukan Belum Terdaftar"});
    }
  };

//Logout Akun Admin --(DELETE)
export const LogoutAdmin = async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) return res.status(400).json({ msg: "You Have No Tokens" });
    const response = await Admin.findAll({
      where: {
        token: accessToken,
      },
    });
    if (!response[0]) return res.sendStatus(204);
    const adminId = response[0].id;
    await Admin.update(
      { token: null },
      {
        where: {
          id: adminId,
        },
      }
    );
    res.clearCookie("accessToken");
    return res.sendStatus(200);
  };

//Verifikasi token milik Admin --(GET)
export const TokenAdmin = async (req, res) => {
    try {
      const TokenAdmin = req.cookies.accessToken;
      if (!TokenAdmin) return res.sendStatus(404);
      const response = await Admin.findAll({
        where: {
          token: TokenAdmin,
        },
      });
      if (!response[0]) return res.sendStatus(204);
      res.json(TokenAdmin);
    } catch (error) {
      console.log(error);
    }
  };

//Mendapatkan satu data Admin By Token --(POST)
export const getAdminSatu = async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) return res.status(400).json({ msg: "You Have No Tokens" });
    const response = await Admin.findAll({
      where: {
        token: accessToken,
      },
    });
    if (!response[0]) return res.sendStatus(204);
    const adminId = response[0].id;
    const admin = await Admin.findOne({
      attributes: ["id", "nama", "email"],
      where: {
        id: adminId,
      },
    });
    res.status(200).json({ admin });
  };

//Mendapatkan satu data Admin By ID --(GET)
export const getAdminById = async (req, res) => {
  try {
    const response = await Admin.findOne({
      attributes: [
        "id",
        "nama",
        "email",
        "foto",
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

//Merubah dan Mengupdate Data Diri Admin --(PATCH)
export const patchAdmin = async (req, res) => {
  const response = await Admin.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!response)
    return res.status(404).json({ msg: "Data Admin Tidak Ada" });
  const {
    nama,
    email,
    foto,
  } = req.body;
  try {
    await Admin.update(
      {
        nama,
        email,
        foto,
      },
      {
        where: {
          id: response.id,
        },
      }
    );
    res.status(200).json({ msg: "Data Admin Berhasil diupdate" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "error", error });
  }
};

//Upload Foto Admin ke Server (POST)
export const uploadFotoAdmin = async (req, res) => {
  let finalImageURL = "images" + "/" + req.file.filename;
  res.json({ status: "success", image: finalImageURL });
};

//Mengubah Password Admin -- (PATCH)
export const patchPasswordAdmin = async (req, res) => {
  const admin = await Admin.findOne({
      where: {
          id: req.params.id
      }
  });
  if(!admin) return res.status(404).json({msg:"Admin Tidak Ditemukan"})
  const {oldPassword, password} = req.body;
  const salt = await bcrypt.genSalt();
  const oldPasswordValid = bcrypt.compareSync(oldPassword, admin.password)
  if(oldPasswordValid) {
      const hashPassword = await bcrypt.hash(password, salt);
      try {
          await Admin.update({
              password: hashPassword
          },{
              where: {
                  id: admin.id
              }
          });
          res.json({msg:"Password Anda Berhasil diupdate"});
      } catch (error) {
          console.log(error);
      }
  } else {
      res.status(422).json({msg:"Password lama tidak benar!"});
  }
}

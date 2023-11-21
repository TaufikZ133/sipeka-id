//Entry Point
import express from "express";
import multer from "multer";
//Router
const router = express.Router();

// Token
// import { VerifyToken, VerifyTokenAdmin } from "../middleware/AuthToken.js";

//Admin
import {
  RegisterAdmin,
  LoginAdmin,
  LogoutAdmin,
  getAdminSatu,
  TokenAdmin,
  getAdminById,
  patchAdmin,
  uploadFotoAdmin,
  patchPasswordAdmin,
} from "../controllers/Admin.js";
//Karyawan
import {
  GetKaryawanById,
  LoginKaryawan,
  RegisterKaryawan,
  getKaryawanSatu,
  LogoutKaryawan,
  Cookie,
  ForgetPassword,
  patchKaryawan,
  uploadFotoKaryawan,
  getKaryawan,
  deleteKaryawan,
  patchPassword,
  getKaryawanByJabatan,
} from "../controllers/Karyawan.js";
//Presensi
import {
  getPresensi,
  getPresensiById,
  getPresensiForeign,
  addPresensi,
} from "../controllers/Presensi.js";
//Gaji
import { getGaji, getGajiById, getGajiForeign, addGaji, patchGaji, deleteGaji, addBulkGaji} from "../controllers/Gaji.js";
//Master Gaji
import { getMasterGaji, getMasterGajiById, addMasterGaji, patchMasterGaji, deleteMasterGaji } from "../controllers/MasterGaji.js";
//Dokumen
import { getDokumen, getDokumenById, addDokumen, deleteDokumen, patchDokumen} from "../controllers/Dokumen.js";



//Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

//Admin --(API)
router.post("/register", RegisterAdmin);
router.post("/login", LoginAdmin);
router.delete("/logout", LogoutAdmin);
router.post("/admin", getAdminSatu);
router.patch("/update-admin/:id", patchAdmin);
router.patch("/password-admin/:id", patchPasswordAdmin);
router.get("/admin/:id", getAdminById);
router.get("/token", TokenAdmin);
router.post("/admin-upload", upload.single("foto"), uploadFotoAdmin);
//Karyawan --(API)
router.post("/daftar", RegisterKaryawan);
router.post("/masuk", LoginKaryawan);
router.delete("/keluar", LogoutKaryawan);
router.delete("/karyawan/:id", deleteKaryawan);
router.post("/karyawan", getKaryawanSatu);
router.get("/karyawan/:id", GetKaryawanById);
router.post("/karyawan-jabatan", getKaryawanByJabatan);
router.get("/karyawan", getKaryawan);
router.get("/cookie", Cookie);
router.post("/forget", ForgetPassword);
router.patch("/update-karyawan/:id", patchKaryawan);
router.patch("/password-karyawan/:id", patchPassword);
router.post("/karyawan-upload", upload.single("foto"), uploadFotoKaryawan);
//Presensi --(API)
router.get("/presensi", getPresensi);
router.get("/presensi/:id", getPresensiById);
router.post("/presensi-foreign", getPresensiForeign);
router.post("/presensi", addPresensi);
//Gaji --(API)
router.get("/gaji", getGaji);
router.get("/gaji/:id", getGajiById);
router.post("/gaji-foreign", getGajiForeign);
router.post("/gaji", addGaji);
router.post("/bulk-gaji", addBulkGaji);
router.patch("/gaji/:id", patchGaji);
router.delete("/gaji/:id", deleteGaji);
//Master Gaji --(API)
router.get("/master-gaji", getMasterGaji);
router.get("/master-gaji/:id", getMasterGajiById);
router.post("/master-gaji", addMasterGaji);
router.patch("/master-gaji/:id", patchMasterGaji);
router.delete("/master-gaji/:id",deleteMasterGaji );
//Dokumen --(API)
router.get("/dokumen", getDokumen);
router.get("/dokumen/:id", getDokumenById);
router.post("/dokumen", addDokumen);
router.patch("/dokumen/:id", patchDokumen);
router.delete("/dokumen/:id",deleteDokumen );

//Export
export default router;

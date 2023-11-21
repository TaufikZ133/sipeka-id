import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
//Asset
import arrowtwhiteImg from "../assets/arrowtwhite.png";
//Modal
import ModalGantiPassword from "../modal/ModalGantiPassword.jsx";
import ModalUploadKtp from "../modal/ModalUploadKtp.jsx";
import ModalUploadIjazah from "../modal/ModalUploadIjazah.jsx";
import ModalUploadKk from "../modal/ModalUploadKK.jsx";

export default function DataKaryawan() {
  const { id } = useParams();
  const SIDEBAR_WIDTH = 300;
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [fotoKaryawan, setFotoKaryawan] = useState();
  const [saveImage, setSaveImage] = useState(null);
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [status, setStatus] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [departemen, setDepartemen] = useState("");
  const [email, setEmail] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [tempatTanggalLahir, setTempatTanggalLahir] = useState("");
  const [kewarganegaraan, setKewarganegaraan] = useState("");
  const [nomerHp, setNomerHp] = useState("");
  const [agama, setAgama] = useState("");
  const [golonganDarah, setGolonganDarah] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kota, setKota] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kodePos, setKodePos] = useState("");
  const [asalSd, setAsalSd] = useState("");
  const [asalSmp, setAsalSmp] = useState("");
  const [asalSma, setAsalSma] = useState("");
  const [perguruanTinggi, setPerguruanTinggi] = useState("");
  const [jurusanProdi, setJurusanProdi] = useState("");
  const [namaAyah, setNamaAyah] = useState("");
  const [namaIbu, setNamaIbu] = useState("");
  const [namaSuamiIstri, setNamaSuamiIstri] = useState("");
  const [jumlahAnak, setJumlahAnak] = useState("");
  const [saudaraKandung, setSaudaraKandung] = useState("");
  const [teleponKeluarga, setTeleponKeluarga] = useState("");
  const [showModalGantiPassword, setShowModalGantiPassword] = useState(false);
  const [modalKtp, setModalKtp] = useState(false);
  const [modalIjazah, setModalIjazah] = useState(false);
  const [modalKk, setModalKk] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState({});

  useEffect(() => {
    authParams();
    getKaryawan();
    // eslint-disable-next-line
  }, []);

  const handleUploadChange = (e) => {
    const uploaded = e.target.files[0];
    setSaveImage(uploaded);
    setFotoKaryawan(URL.createObjectURL(uploaded));
  };

  const gantiPassword = () => {
    setShowModalGantiPassword(true);
  };

  const closeModalGantiPassword = () => {
    setShowModalGantiPassword(false);
  };

  const authParams = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + "/cookie");
      if (response.status === 204) {
        navigate("/");
      }
      const decoded = jwt_decode(response.data);
      // eslint-disable-next-line
      if (decoded.karyawanId != id) {
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const handleBatal = () => {
    window.location.reload(false);
    window.scrollTo({ top: 0, left: 0 });
    alert("Perubahan Dibatalkan");
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    try {
      if (saveImage !== null) {
        const formData = new FormData();
        formData.append("foto", saveImage);
        const response = await axios.post(
          process.env.REACT_APP_API_URL+"/karyawan-upload",
          formData,
          {
            onUploadProgress: (data) => {
              console.log(Math.round((data.loaded / data.total) * 100));
            },
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          await axios.patch(process.env.REACT_APP_API_URL+`/update-karyawan/${id}`, {
            pas_foto: response.data.image,
          });
          alert("Pas Foto Anda Berhasil di Update");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getKaryawan = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL+`/karyawan/${id}`);
      if (response.status === 200) {
        setFotoKaryawan(process.env.REACT_APP_API_URL +"/"+ response.data.pas_foto);
        setNik(response.data.nik);
        setNama(response.data.nama);
        setStatus(response.data.status);
        setJabatan(response.data.jabatan);
        setDepartemen(response.data.departemen);
        setEmail(response.data.email);
        setJenisKelamin(response.data.jenis_kelamin);
        setTempatTanggalLahir(response.data.tempat_tanggal_lahir);
        setKewarganegaraan(response.data.kewarganegaraan);
        setNomerHp(response.data.nomer_hp);
        setAgama(response.data.agama);
        setGolonganDarah(response.data.golongan_darah);
        setAlamat(response.data.alamat);
        setKota(response.data.kota);
        setProvinsi(response.data.provinsi);
        setKodePos(response.data.kode_pos);
        setAsalSd(response.data.asal_sd);
        setAsalSmp(response.data.asal_smp);
        setAsalSma(response.data.asal_sma);
        setPerguruanTinggi(response.data.perguruan_tinggi);
        setJurusanProdi(response.data.jurusan_prodi);
        setNamaAyah(response.data.nama_ayah);
        setNamaIbu(response.data.nama_ibu);
        setNamaSuamiIstri(response.data.nama_suamiistri);
        setJumlahAnak(response.data.jumlah_anak);
        setSaudaraKandung(response.data.saudara_kandung);
        setTeleponKeluarga(response.data.telepon_keluarga);
        setInitialFormValues(response.data);
      }
      if (response.data.pas_foto.length === 0) {
        setFotoKaryawan("https://fakeimg.pl/300/?text=Pas Foto");
        console.log("Foto karyawan tidak ada");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Logout = async (e) => {
    try {
      await axios.delete(process.env.REACT_APP_API_URL+"/keluar");
      navigate("/login");
      e.preventDefault();
    } catch (error) {
      console.log(error);
    }
  };

  const Submit = async (e) => {
    e.preventDefault();
  };

  const handleUpdateDataDiri = async () => {
    try {
      await axios.patch(process.env.REACT_APP_API_URL+`/update-karyawan/${id}`, {
        nik: nik,
        nama: nama,
        status: status,
        jabatan: jabatan,
        departemen: departemen,
        email: email,
        jenis_kelamin: jenisKelamin,
        tempat_tanggal_lahir: tempatTanggalLahir,
        kewarganegaraan: kewarganegaraan,
        nomer_hp: nomerHp,
        agama: agama,
        golongan_darah: golonganDarah,
        alamat: alamat,
        kota: kota,
        provinsi: provinsi,
        kode_pos: kodePos,
        asal_sd: asalSd,
        asal_smp: asalSmp,
        asal_sma: asalSma,
        perguruan_tinggi: perguruanTinggi,
        jurusan_prodi: jurusanProdi,
        nama_ayah: namaAyah,
        nama_ibu: namaIbu,
        nama_suamiistri: namaSuamiIstri,
        jumlah_anak: jumlahAnak,
        saudara_kandung: saudaraKandung,
        telepon_keluarga: teleponKeluarga,
      });
      alert("Data Diri Anda Berhasil di Update");
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalKtp = () => {
    setModalKtp(false);
  };

  const showModalKtp = () => {
    setModalKtp(true);
  };

  const closeModalIjazah = () => {
    setModalIjazah(false);
  };

  const showModalIjazah = () => {
    setModalIjazah(true);
  };

  const closeModalKk = () => {
    setModalKk(false);
  };

  const showModalKk = () => {
    setModalKk(true);
  };

  const printPage = () => {
    window.print()
  }

  return (
    // Content Of Sidebar
    <section className="flex h-fulll">
      <div
        style={{ width: open ? SIDEBAR_WIDTH : 80 }}
        className={`min-h-screen text-white duration-300 bg-[#1C1F2D]`}
      >
        <div>
          <div className="py-4 flex justify-end p-3">
            <div className="mr-[2rem]">
              <img
                size={26}
                alt="arrow"
                className={`text-white cursor-pointer absolute ${
                  !open && "rotate-180"
                }`}
                src={arrowtwhiteImg}
                onClick={() => setOpen(!open)}
              />
            </div>
          </div>
        </div>

        <div>
          <ul className="m-auto">
            <li className="flex items-center mr-5 p-2 rounded-md mt-2 ">
              <span
                className={`text-base text-gray-200 flex-1 font-montserrat font-semibold text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                <h5 className="text-center">Sistem Informasi</h5>
                <h5 className="text-center text-blue-500 pt-2">
                  Manajemen Karyawan
                </h5>
              </span>
            </li>
            <br></br>
            <li className="cursor-pointer flex items-center gap-x-4 p-4 hover:opacity-50 rounded-md mt-2 mx-3">
              <svg
                className="w-6 h-6 ml-2 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
              </svg>
              <h5
                onClick={() => navigate("/dashboard")}
                className={`text-base text-white mr-4 font-montserrat font-semibold flex-1 text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                Dashboard
              </h5>
            </li>

            <li className="cursor-pointer flex items-center gap-x-4 p-4 hover:opacity-50 rounded-md mt-2 mx-3">
              <svg
                className="w-6 h-6 ml-2 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 2h4a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4m6 0a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1m6 0v3H6V2M5 5h8m-8 5h8m-8 4h8"
                />
              </svg>
              <h5
                onClick={() => navigate(`/presensi-karyawan/${id}`)}
                className={`text-base text-white mr-4 font-montserrat font-semibold flex-1 text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                Kelola Presensi
              </h5>
            </li>
            <li className="cursor-pointer flex items-center gap-x-4 p-4 hover:opacity-50 rounded-md bg-white bg-opacity-20 mt-2 mx-3">
              <svg
                className="w-6 h-6 ml-2 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
              </svg>
              <h5
                onClick={() => navigate(`/data-karyawan/${id}`)}
                className={`text-base text-white mr-4 font-montserrat font-semibold flex-1 text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                Kelola Data Diri
              </h5>
            </li>
            <li className="cursor-pointer flex items-center gap-x-4 p-4 hover:opacity-50 rounded-md mt-2 mx-3">
              <svg
                className="w-6 h-6 ml-2 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z" />
                <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
              </svg>
              <h5
                onClick={() => navigate(`/gaji-karyawan/${id}`)}
                className={`text-base text-white mr-4 font-montserrat font-semibold flex-1 text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                Cetak Slip Gaji
              </h5>
            </li>
            <li className="cursor-pointer flex items-center gap-x-4 p-4 hover:opacity-50 rounded-md mt-2 mx-3">
              <svg
                className="w-6 h-6 ml-2 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2Zm-2.359 10.707-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L7 12.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <h5
                onClick={() => navigate(`/dokumen-karyawan/${id}`)}
                className={`text-base text-white mr-4 font-montserrat font-semibold flex-1 text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                Buat Dokumen
              </h5>
            </li>
            <li className="cursor-pointer flex items-center gap-x-4 p-4 hover:opacity-50 rounded-md mt-2 mx-3">
              <svg
                className="w-6 h-6 ml-2 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
              </svg>
              <h5
                onClick={() => navigate(`/chatting/${id}`)}
                className={`text-base text-white mr-4 font-montserrat font-semibold flex-1 text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                Ruang Chat
              </h5>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="w-full left-20"
        style={{
          width: open ? `calc(100% - ${SIDEBAR_WIDTH}px)` : `calc(100% - 80px)`,
        }}
      >
        {/* Content of Dashboard Karyawan */}
        <div className="content-karyawan">
          <div className="w-full h-full bg-gray-300 pb-8">
            <div className="bg-white py-1 flex items-center px-5 shadow-[0px_8px_24px_rgba(0,0,0,0.12)] border-t-2 border-gray-200">
              <div>
                <div className="w-[12rem] text-black text-[16px] font-semibold p-3">
                  Kelola Data Diri
                </div>
              </div>
              <div className="w-screen"></div>
              <div>
                <button
                  onClick={Logout}
                  className=" bg-red-500 hover:bg-red-800  rounded-[8px] text-white shadow-xl text-[16px] font-semibold p-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.050] duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="bg-white p-2 font-semibold rounded-[12px] mx-[1rem] mt-[2rem] shadow-2xl">
              {/* Form Bagian Profil Karyawan*/}
              <p onClick={printPage} className="mt-3 mx-3 py-2 px-2 bg-blue-600 text-white ">
                Profil Karyawan
              </p>
              <div className="flex">
                <img
                  src={fotoKaryawan}
                  alt="karyawan"
                  className="mx-10 my-8 w-[18rem] h-[20rem] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.050] duration-300"
                />
                <div className="mr-10">
                  <p className="mt-9">Nik</p>
                  <p className="mt-9">Nama</p>
                  <p className="mt-9">Status</p>
                  <p className="mt-9">Jabatan</p>
                  <p className="mt-9">Departemen</p>
                  <p className="mt-9">Email</p>
                  <p className="mt-9">Pas Foto</p>
                </div>
                <div className="w-full">
                  <form className="my-8 w-full pr-8" onSubmit={Submit}>
                    <input
                      className="flex rounded-[5px] border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                      placeholder="Masukan Nik"
                      type="text"
                      value={nik}
                      onChange={(e) => setNik(e.target.value)}
                      disabled={saveImage !== null}
                    />
                    <input
                      className="flex rounded-[5px] mt-5 border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                      placeholder="Masukan Nama"
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      disabled={saveImage !== null}
                    />
                    <input
                      className="flex rounded-[5px] mt-5 border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                      placeholder="Masukan Status"
                      type="text"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      disabled={saveImage !== null}
                    />
                    <input
                      className="flex rounded-[5px] mt-5 border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                      placeholder="Masukan Jabatan"
                      type="text"
                      value={jabatan}
                      onChange={(e) => setJabatan(e.target.value)}
                      disabled={saveImage !== null}
                    />
                    <input
                      className="flex rounded-[5px] mt-5 border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                      placeholder="Masukan Departemen"
                      type="text"
                      value={departemen}
                      onChange={(e) => setDepartemen(e.target.value)}
                      disabled={saveImage !== null}
                    />
                    <input
                      className="flex rounded-[5px] mt-5 border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                      placeholder="Masukan Email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={saveImage !== null}
                    />
                    <input
                      onChange={handleUploadChange}
                      className="form-control mt-5 w-[32rem]"
                      id="formfile"
                      type="file"
                      accept="image/*"
                    ></input>
                    <button
                      className="bg-red-500 hover:bg-red-800 rounded-[8px] text-white shadow-xl text-[16px] mt-5 font-semibold p-2 w-[8rem] mr-3 disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                      onClick={handleBatal}
                      hidden={saveImage === null}
                    >
                      Batal
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-800 rounded-[8px] text-white shadow-xl text-[16px] mt-5 font-semibold p-2 w-[10rem] disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                      onClick={uploadImage}
                      hidden={saveImage === null}
                    >
                      Update Foto
                    </button>
                  </form>
                </div>
              </div>
              {/* Form Bagian Detail Karyawan*/}
              <p className="mt-3 mx-3 py-2 px-2 bg-blue-600 text-white ">
                Detail Karyawan
              </p>
              <div className="ml-6">
                <div className="flex">
                  <div className="mr-16">
                    <p className="mt-9 w-[10rem]">Jenis Kelamin</p>
                    <p className="mt-9">Tempat Tanggal Lahir</p>
                    <p className="mt-9">Kewarganegaraan</p>
                    <p className="mt-9">Nomer Telepon</p>
                    <p className="mt-9">Agama</p>
                    <p className="mt-9">Golongan Darah</p>
                  </div>
                  <div className="w-full">
                    <form className="my-8 w-full pr-8" onSubmit={Submit}>
                      <input
                        className="flex rounded-[5px] border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                        placeholder="Masukan Jenis Kelamin"
                        type="text"
                        value={jenisKelamin}
                        onChange={(e) => setJenisKelamin(e.target.value)}
                        disabled={saveImage !== null}
                      />
                      <input
                        className="flex rounded-[5px] mt-5 border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                        placeholder="Masukan Tempat Tanggal Lahir"
                        type="text"
                        value={tempatTanggalLahir}
                        onChange={(e) => setTempatTanggalLahir(e.target.value)}
                        disabled={saveImage !== null}
                      />
                      <input
                        className="flex rounded-[5px] mt-5 border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                        placeholder="Masukan Kewarganegaraan"
                        type="text"
                        value={kewarganegaraan}
                        onChange={(e) => setKewarganegaraan(e.target.value)}
                        disabled={saveImage !== null}
                      />
                      <input
                        className="flex rounded-[5px] mt-5 border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                        placeholder="Masukan Nomer Telepon"
                        type="text"
                        value={nomerHp}
                        onChange={(e) => setNomerHp(e.target.value)}
                        disabled={saveImage !== null}
                      />
                      <input
                        className="flex rounded-[5px] mt-5 border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                        placeholder="Masukan Agama"
                        type="text"
                        value={agama}
                        onChange={(e) => setAgama(e.target.value)}
                        disabled={saveImage !== null}
                      />
                      <input
                        className="flex rounded-[5px] mt-5 border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                        placeholder="Masukan Golongan Darah"
                        type="text"
                        value={golonganDarah}
                        onChange={(e) => setGolonganDarah(e.target.value)}
                        disabled={saveImage !== null}
                      />
                    </form>
                  </div>
                </div>
              </div>
              {/* Form Bagian Detail Kontak*/}
              <p className="mt-3 mx-3 py-2 px-2 bg-blue-600 text-white ">
                Detail Alamat Tempat Tinggal
              </p>
              <div className="ml-6">
                <div className="flex">
                  <div className="mr-16">
                    <p className="mt-9 w-[10rem]">Alamat</p>
                    <p className="mt-9">Kota</p>
                    <p className="mt-9">Provinsi</p>
                    <p className="mt-9">Kode Pos</p>
                  </div>
                  <div className="w-full">
                    <form className="my-8 w-full pr-8" onSubmit={Submit}>
                      <input
                        className="flex rounded-[5px] border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                        placeholder="Masukan Alamat"
                        type="text"
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                        disabled={saveImage !== null}
                      />
                      <input
                        className="flex rounded-[5px] mt-5 border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                        placeholder="Masukan Kota"
                        type="text"
                        value={kota}
                        onChange={(e) => setKota(e.target.value)}
                        disabled={saveImage !== null}
                      />
                      <input
                        className="flex rounded-[5px] mt-5 border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                        placeholder="Masukan Provinsi"
                        type="text"
                        value={provinsi}
                        onChange={(e) => setProvinsi(e.target.value)}
                        disabled={saveImage !== null}
                      />
                      <input
                        className="flex rounded-[5px] mt-5 border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                        placeholder="Masukan Kode Pos"
                        type="text"
                        value={kodePos}
                        onChange={(e) => setKodePos(e.target.value)}
                        disabled={saveImage !== null}
                      />
                    </form>
                  </div>
                </div>
              </div>
              {/* Form Bagian Detail Edukasi dan Profesi*/}
              <p className="mt-3 mx-3 py-2 px-2 bg-blue-600 text-white ">
                Detail Edukasi dan Profesi
              </p>
              <div className="ml-6">
                <div className="flex">
                  <div className="mr-16">
                    <p className="mt-9 w-[10rem]">Asal SD</p>
                    <p className="mt-9">Asal SMP</p>
                    <p className="mt-9">Asal SMA</p>
                    <p className="mt-9">Perguruan Tinggi</p>
                    <p className="mt-9">Jurusan Prodi</p>
                  </div>
                  <div className="w-full">
                    <form className="my-8 w-full pr-8" onSubmit={Submit}>
                      <input
                        className="flex rounded-[5px] border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                        placeholder="Masukan Asal Sekolah Dasar"
                        type="text"
                        value={asalSd}
                        onChange={(e) => setAsalSd(e.target.value)}
                        disabled={saveImage !== null}
                      />
                      <input
                        className="flex rounded-[5px] mt-5 border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                        placeholder="Masukan Asal Sekolah Menengah Pertama"
                        type="text"
                        value={asalSmp}
                        onChange={(e) => setAsalSmp(e.target.value)}
                        disabled={saveImage !== null}
                      />
                      <input
                        className="flex rounded-[5px] mt-5 border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                        placeholder="Masukan Asal Sekolah Menengah Atas"
                        type="text"
                        value={asalSma}
                        onChange={(e) => setAsalSma(e.target.value)}
                        disabled={saveImage !== null}
                      />
                      <input
                        className="flex rounded-[5px] mt-5 border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                        placeholder="Masukan Perguruan Tinggi"
                        type="text"
                        value={perguruanTinggi}
                        onChange={(e) => setPerguruanTinggi(e.target.value)}
                        disabled={saveImage !== null}
                      />
                      <input
                        className="flex rounded-[5px] mt-5 border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                        placeholder="Masukan Jurusan Prodi"
                        type="text"
                        value={jurusanProdi}
                        onChange={(e) => setJurusanProdi(e.target.value)}
                        disabled={saveImage !== null}
                      />
                    </form>
                  </div>
                </div>
              </div>
              {/* Form Bagian Data Keluarga*/}
              <p className="mt-3 mx-3 py-2 px-2 bg-blue-600 text-white ">
                Detail Data Keluarga
              </p>
              <div className="ml-6">
                <div className="flex">
                  <div className="mr-16">
                    <p className="mt-9 w-[10rem]">Nama Ayah</p>
                    <p className="mt-9">Nama Ibu</p>
                    <p className="mt-9">Nama Suami/Istri</p>
                    <p className="mt-9">Jumlah Anak</p>
                    <p className="mt-9">Saudara Kandung</p>
                    <p className="mt-9">Telepon Keluarga</p>
                  </div>
                  <div className="w-full">
                    <form className="my-8 w-full pr-8" onSubmit={Submit}>
                      <input
                        className="flex rounded-[5px] border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                        placeholder="Masukan Nama Ayah"
                        type="text"
                        value={namaAyah}
                        onChange={(e) => setNamaAyah(e.target.value)}
                        disabled={saveImage !== null}
                      />
                      <input
                        className="flex rounded-[5px] mt-5 border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                        placeholder="Masukan Nama Ibu"
                        type="text"
                        value={namaIbu}
                        onChange={(e) => setNamaIbu(e.target.value)}
                        disabled={saveImage !== null}
                      />
                      <input
                        className="flex rounded-[5px] mt-5 border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                        placeholder="Masukan Nama Suami atau Istri (Kosongkan Bila Tidak Ada)"
                        type="text"
                        value={namaSuamiIstri}
                        onChange={(e) => setNamaSuamiIstri(e.target.value)}
                        disabled={saveImage !== null}
                      />
                      <input
                        className="flex rounded-[5px] mt-5 border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                        placeholder="Masukan Jumlah Anak (Kosongkan Bila Tidak Ada)"
                        type="text"
                        value={jumlahAnak}
                        onChange={(e) => setJumlahAnak(e.target.value)}
                        disabled={saveImage !== null}
                      />
                      <input
                        className="flex rounded-[5px] mt-5 border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                        placeholder="Masukan Jumlah Saudara Kandung"
                        type="text"
                        value={saudaraKandung}
                        onChange={(e) => setSaudaraKandung(e.target.value)}
                        disabled={saveImage !== null}
                      />
                      <input
                        className="flex rounded-[5px] mt-5 border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                        placeholder="Masukan Nomer Telepon Keluarga"
                        type="text"
                        value={teleponKeluarga}
                        onChange={(e) => setTeleponKeluarga(e.target.value)}
                        disabled={saveImage !== null}
                      />
                    </form>
                  </div>
                </div>
              </div>
              {/* Form Bagian Detail Kontak*/}
              <p className="mt-3 mx-3 py-2 px-2 bg-blue-600 text-white ">
                Unggah Dokumen Pribadi
              </p>
              <div className="ml-6">
                <div className="flex">
                  <div className="mr-16">
                    <p className="mt-9 w-[10rem]">Foto KTP</p>
                    <p className="mt-9">Foto KK</p>
                    <p className="mt-9">Foto Ijazah</p>
                  </div>
                  <div className="w-full">
                    <div className="my-8 w-full pr-8">
                      <button
                        type="button"
                        className="text-white min-w-[12rem] flex bg-[#24292F] font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-2 mb-2 transition ease-in-out delay-150 hover:scale-[1.050] duration-300"
                        onClick={showModalKtp}
                      >
                        <svg
                          className="w-4 h-4 mr-3 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2Zm-3 15H4.828a1 1 0 0 1 0-2h6.238a1 1 0 0 1 0 2Zm0-4H4.828a1 1 0 0 1 0-2h6.238a1 1 0 1 1 0 2Z" />
                          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                        </svg>
                        Perbarui Foto KTP
                      </button>
                      <button
                        type="button"
                        className="text-white min-w-[12rem] flex mt-5 bg-[#24292F] font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-2 mb-2 transition ease-in-out delay-150 hover:scale-[1.050] duration-300"
                        onClick={showModalKk}
                      >
                        <svg
                          className="w-4 h-4 mr-3 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2Zm-3 15H4.828a1 1 0 0 1 0-2h6.238a1 1 0 0 1 0 2Zm0-4H4.828a1 1 0 0 1 0-2h6.238a1 1 0 1 1 0 2Z" />
                          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                        </svg>
                        Perbarui Foto KK
                      </button>
                      <button
                        type="button"
                        className="text-white flex mt-5 bg-[#24292F] font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-2 mb-2 transition ease-in-out delay-150 hover:scale-[1.050] duration-300"
                        onClick={showModalIjazah}
                      >
                        <svg
                          className="w-4 h-4 mr-3 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2Zm-3 15H4.828a1 1 0 0 1 0-2h6.238a1 1 0 0 1 0 2Zm0-4H4.828a1 1 0 0 1 0-2h6.238a1 1 0 1 1 0 2Z" />
                          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                        </svg>
                        Perbarui Foto Ijazah
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Form Bagian Detail Kontak*/}
              <p className="mt-3 mx-3 py-2 px-2 bg-blue-600 text-white ">
                Akun Login
              </p>
              <div className="ml-6">
                <div className="flex">
                  <div className="mr-16">
                    <p className="mt-9 w-[10rem]">Password</p>
                  </div>
                  <div className="w-full">
                    <div className="my-8 w-full pr-8">
                      <button
                        type="button"
                        className="text-white min-w-[12rem] flex mt-5 bg-[#24292F] font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-2 mb-2 transition ease-in-out delay-150 hover:scale-[1.050] duration-300"
                        onClick={gantiPassword}
                      >
                        <svg
                          className="w-4 h-4 mr-3 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M14 7h-1.5V4.5a4.5 4.5 0 1 0-9 0V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-5 8a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Zm1.5-8h-5V4.5a2.5 2.5 0 1 1 5 0V7Z" />
                        </svg>
                        Ganti Password
                      </button>
                    </div>
                    <button
                      className="bg-blue-500 hover:bg-blue-800 rounded-[8px] text-white shadow-xl text-[16px] my-5 font-semibold p-3 w-[11rem] mr-8 disabled:bg-gray-300 float-right transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.050] duration-300"
                      onClick={handleUpdateDataDiri}
                      disabled={
                        nama === initialFormValues.nama &&
                        alamat === initialFormValues.alamat &&
                        status === initialFormValues.status &&
                        jabatan === initialFormValues.jabatan
                      }
                    >
                      Update Data Diri
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-800 rounded-[8px] text-white shadow-xl text-[16px] my-5 font-semibold p-3 w-[11rem] mr-5 disabled:bg-gray-300 float-right transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.050] duration-300"
                      onClick={handleBatal}
                    >
                      Batal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-gantiPassword">
        {showModalGantiPassword && (
          <ModalGantiPassword close={closeModalGantiPassword} MyId={id} />
        )}
      </div>
      <div className="modal-uploadKtp">
        {modalKtp && <ModalUploadKtp close={closeModalKtp} MyId={id} />}
      </div>
      <div className="modal-uploadIjazah">
        {modalIjazah && (
          <ModalUploadIjazah close={closeModalIjazah} MyId={id} />
        )}
      </div>
      <div className="modal-uploadKk">
        {modalKk && <ModalUploadKk close={closeModalKk} MyId={id} />}
      </div>
    </section>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
//Asset
import arrowtwhiteImg from "../assets/arrowtwhite.png";
//Modal
import ModalPasswordAdmin from "../modal-admin/ModalPasswordAdmin.jsx";

export default function DataAdmin() {
  const { id } = useParams();
  const SIDEBAR_WIDTH = 300;
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [fotoAdmin, setFotoAdmin] = useState();
  const [saveImage, setSaveImage] = useState(null);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [showModalPassword, setShowModalPassword] = useState(false);

  useEffect(() => {
    authParams();
    getAdmin();
    // eslint-disable-next-line
  }, []);

  const handleUploadChange = (e) => {
    const uploaded = e.target.files[0];
    setSaveImage(uploaded);
    setFotoAdmin(URL.createObjectURL(uploaded));
  };

  const authParams = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL+"/token");
      if (response.status === 204) {
        navigate("/");
      }
      const decoded = jwt_decode(response.data);
      // eslint-disable-next-line
      if (decoded.adminId != id) {
        navigate("/admin");
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
          process.env.REACT_APP_API_URL+"/admin-upload",
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
          await axios.patch(process.env.REACT_APP_API_URL+`/update-admin/${id}`, {
            foto: response.data.image,
          });
          alert("Foto Anda Berhasil di Update");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAdmin = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL+`/admin/${id}`);
      if (response.status === 200) {
        setFotoAdmin(process.env.REACT_APP_API_URL +"/" + response.data.foto);
        setNama(response.data.nama);
        setEmail(response.data.email);
      }
      if (response.data.foto === null) {
        setFotoAdmin("https://fakeimg.pl/300/");
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
      await axios.patch(process.env.REACT_APP_API_URL+`/update-admin/${id}`, {
        nama: nama,
        email: email,
      });
      alert("Profil Anda Berhasil di Update");
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalPassword = () => {
    setShowModalPassword(false);
  };

  const handlePassword = () => {
    setShowModalPassword(true);
  }

  return (
    <section className="flex h-fulll">
      {/* Content of Sidebar */}
      <div
        style={{ width: open ? SIDEBAR_WIDTH : 80 }}
        className={`min-h-screen text-white duration-300 bg-[#1C1F2D]`}
      >
        <div>
          <div className="py-4 flex justify-end p-3">
            <div className="mr-[2rem]">
              <img
                size={26}
                alt=""
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
            <li className="flex items-center mr-5 p-2 rounded-md mt-2">
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
            <li
              onClick={() => navigate("/admin")}
              className="cursor-pointer flex items-center gap-x-4 p-4 hover:opacity-50 rounded-md mt-2 mx-3"
            >
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
                className={`text-base text-white mr-4 font-montserrat font-semibold flex-1 text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                Dashboard
              </h5>
            </li>
            <li className="cursor-pointer flex items-center gap-x-4 p-4 hover:opacity-50 rounded-md mt-2 mx-3 bg-white bg-opacity-20">
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
                onClick={() => navigate(`/kelola-gaji/${id}`)}
                className={`text-base text-white mr-4 font-montserrat font-semibold flex-1 text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                Kelola Slip Gaji
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
                onClick={() => navigate(`/kelola-dokumen/${id}`)}
                className={`text-base text-white mr-4 font-montserrat font-semibold flex-1 text-[13px] leading-[20px] ${
                  !open && "hidden"
                }`}
              >
                Kelola Dokumen
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
                onClick={() => navigate(`/chat-admin/${id}`)}
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
        {/* Content of Data Diri Admin */}
        <div className="content-admin h-full">
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
              <p className="mt-3 mx-3 py-2 px-2 bg-blue-600 text-white ">
                Profil Admin
              </p>
              <div className="flex">
                <img
                  src={fotoAdmin}
                  alt="admin"
                  className="mx-10 my-8 w-[18rem] h-[20rem] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.050] duration-300"
                />
                <div className="mr-10">
                  <p className="mt-9">Nama</p>
                  <p className="mt-9">Email</p>
                  <p className="mt-9">Foto</p>
                  <p className="mt-10">Password</p>
                </div>
                <div className="w-full">
                  <form className="my-8 w-full pr-8" onSubmit={Submit}>
                    <input
                      className="flex rounded-[5px] border-black border h-[2.5rem] w-full p-2 focus:outline-none disabled:bg-gray-300 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-[1.010] duration-300"
                      placeholder="Masukan Nama"
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
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
                      className="mt-5"
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
                  <button
                        type="button"
                        className="text-white flex mt-5 bg-[#24292F] font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-2 mb-2 transition ease-in-out delay-150 hover:scale-[1.050] duration-300"
                        onClick={handlePassword}
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
                  <div className="button-update mt-[4rem]">
                    <button
                      className="bg-blue-500 hover:bg-blue-800 rounded-[8px] text-white shadow-xl text-[16px] font-semibold p-3 w-[11rem] mr-8 disabled:bg-gray-300 float-right transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.050] duration-300"
                      onClick={handleUpdateDataDiri}
                      hidden={saveImage !== null}
                    >
                      Update Data Diri
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-800 rounded-[8px] text-white shadow-xl text-[16px] font-semibold p-3 w-[11rem] mr-5 disabled:bg-gray-300 float-right transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.050] duration-300"
                      onClick={handleBatal}
                      hidden={saveImage !== null}
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
        {showModalPassword && (
          <ModalPasswordAdmin close={closeModalPassword} MyId={id} />
        )}
      </div>
    </section>
  );
}

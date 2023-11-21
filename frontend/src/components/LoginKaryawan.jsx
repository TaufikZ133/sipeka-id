//Entry Point
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//Asset
import show from "../assets/show.png";
import hide from "../assets/hide.png";
import login from "../assets/login.png";
//Modal
import ModalLogin from "../modal/ModalLogin";
import ModalLoginAdmin from "../modal-admin/ModalLoginAdmin";

export default function LoginKaryawan() {
  // const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
  const [email, setEmail] = useState("");
  const [adminEmail, setAdminEmail] = useState("")
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalAdmin, setShowModalAdmin] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgPsw, setMsgPsw] = useState("");
  const [error, setError] = useState(false);
  const [emailTidakTerdaftar, setEmailTidakTerdaftar] = useState(false);
  const [passwordSalah, setPasswordSalah] = useState(false);
  const navigate = useNavigate();
  
  useEffect(()=> {
    getAdmin()
    // eslint-disable-next-line
  },[])

  const lupaSandi = () => {
    navigate("/forgot");
  };

  const getAdmin =async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + "/admin/1")
      setAdminEmail(response.data.email)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLoginAdmin = () => {
    setShowModalAdmin(false);
    navigate("/admin");
  };

  const ToLandingPage = () => {
    navigate("/");
  };

  const handleOnClose = () => {
    setShowModal(false);
    navigate("/dashboard");
  };

  const toggle = () => {
    setOpen(!open);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      setMsg(false);
      setMsgPsw(false);
      setError(true);
    }
    if (email === adminEmail) {
      try {
        await axios.post(process.env.REACT_APP_API_URL + "/login", {
          email: email,
          password: password,
        });
        navigate("/admin");
      } catch (error) {
        if (error.response.status === 400) {
          alert("Password Admin Salah")
        }
      }

    }
    if (email !== adminEmail) {
      try {
        await axios.post(process.env.REACT_APP_API_URL + "/masuk", {
          email: email,
          password: password,
        });
        setMsg(false);
        setMsgPsw(false);
        setError(false);
        navigate("/dashboard");
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
          setMsgPsw(error.response.data.msgPsw);
          setError(false);
          if (error.response.status === 404) {
            setEmailTidakTerdaftar(true);
            setPasswordSalah(false);
          }
          if (error.response.status === 400) {
            setEmailTidakTerdaftar(false);
            setPasswordSalah(true);
          }
          if (email.length === 0 || password.length === 0) {
            setMsg(false);
            setMsgPsw(false);
            setError(true);
            setEmailTidakTerdaftar(false);
          }
        }
      }
    }
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600">
      <div>
        <div className="w-[80rem] h-full bg-white rounded-3xl table-fixed animate-fade">
          <div className="pt-3 pb-8">
            <table className="w-[10rem] h-[10rem] justify-center items-center mx-auto">
              <tbody>
                <tr>
                  <td className="border-r-2">
                    <div>
                      <div className="flex flex-col justify-center mx-auto">
                        <div className="w-[40rem] h-full px-5 select-none">
                          <h2 className="text-center text-black font-montserrat font-semibold leading-[28px] text-[24px] m-2 mt-9">
                            Selamat Datang
                          </h2>
                          <p className="text-center font-montserrat text-[15px] text-gray-400">
                            Di Sistem Informasi Manajemen Karyawan
                          </p>
                        </div>
                        <div className="px-10 pt-5 animate-fade">
                          <img
                            className="px-auto py-5 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.050] duration-300 cursor-pointer"
                            onClick={ToLandingPage}
                            src={login}
                            alt="login"
                          />
                        </div>
                        <p className="pt-6 pl-6 font-montserrat text-[15px]">
                          Belum Punya Akun?
                          <Link
                            to="/register"
                            className="text-blue-800 pl-1 font-montserrat font-bold text-[15px] leading-[14px] hover:text-orange-600 hover:text-[18px]"
                          >
                            Daftar Disini
                          </Link>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="pl-6">
                    <div>
                      <div className="flex flex-col justify-center mx-auto">
                        <form
                          onSubmit={handleSubmit}
                          className="w-full h-[580px] p-3 px-10 select-none"
                        >
                          <h2 className="text-center text-black font-montserrat font-semibold leading-[28px] text-[24px] m-2 mt-9">
                            Login
                          </h2>
                          <p className="text-center font-montserrat text-[15px] text-gray-400">
                            Masukan Akun Anda
                          </p>
                          <div className="flex flex-col text-black py-1 mx-5 mt-5">
                            <h5 className="font-montserrat font-semibold leading-[20px] text-[13px] ml-[17px]">
                              Email
                            </h5>
                            <div className="control relative">
                              <input
                                maxLength="30"
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                  setEmailTidakTerdaftar(false);
                                  setMsg(false);
                                }}
                                className={
                                  emailTidakTerdaftar
                                    ? "rounded-[6px] bg-gray-100 mt-2 ml-[17px] p-2 w-[348px] h-[48px] focus:bg-gray-100 text-red-600 focus:outline-none font-montserrat leading-[20px] text-[15px]"
                                    : "rounded-[6px] bg-gray-100 mt-2 ml-[17px] p-2 w-[348px] h-[48px] focus:bg-gray-100 focus:outline-none font-montserrat leading-[20px] text-[15px]"
                                }
                                placeholder="Masukan Email"
                                value={email}
                                type="text"
                              />
                              <p className="ml-[17px] text-red-500 font-montserrat font-medium leading-[16px] text-[12px] absolute">
                                {msg}
                              </p>
                              {error && email.length <= 0 ? (
                                <p className="ml-[17px] text-red-500 font-montserrat font-medium leading-[16px] text-[12px] absolute">
                                  Email Tidak Boleh Kosong.
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col text-black py-4 mx-5 mt-[20px] relative">
                            <label className="font-montserrat font-semibold leading-[20px] text-[13px] ml-[17px]">
                              Kata Sandi
                            </label>
                            <div className="control relative w-[348px] h-[48px] mx-center">
                              <input
                                maxLength="30"
                                onChange={(e) => {
                                  setPassword(e.target.value);
                                  setPasswordSalah(false);
                                  setMsgPsw(false);
                                }}
                                className={
                                  passwordSalah
                                    ? "rounded-[6px] bg-gray-100 mt-2 ml-[17px] p-2 w-[348px] h-[48px] focus:bg-gray-100 text-red-600 focus:outline-none font-montserrat leading-[20px] text-[15px]"
                                    : "rounded-[6px] bg-gray-100 mt-2 ml-[17px] p-2 w-[348px] h-[48px] focus:bg-gray-100 focus:outline-none font-montserrat leading-[20px] text-[15px]"
                                }
                                placeholder="Masukan Kata Sandi"
                                value={password}
                                type={open === false ? "password" : "text"}
                              />

                              <div className="w-[24px] h-[24px] absolute top-5 right-1">
                                {open === false ? (
                                  <img src={hide} alt="x" onClick={toggle} />
                                ) : (
                                  <img src={show} alt="x" onClick={toggle} />
                                )}
                              </div>
                              <p className="ml-[17px] text-red-500 text-[13px] absolute">
                                {msgPsw}
                              </p>
                              {error && password.length <= 0 ? (
                                <p className="ml-[17px] text-red-500 font-montserrat font-medium leading-[16px] text-[12px]">
                                  Password Tidak Boleh Kosong.
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <button className="font-montserrat font-semibold text-[16px] ml-[40px] w-[348px] h-[50px] bg-emerald-500 rounded-[14px] pt-3 pb-3 text-white mt-11 shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.1] duration-300">
                            Masuk
                          </button>
                          <button
                            onClick={lupaSandi}
                            className="font-montserrat font-semibold text-[16px] ml-[40px] w-[348px] h-[50px] bg-orange-600 rounded-[14px] pt-3 pb-3 text-white mt-8 shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.1] duration-300"
                          >
                            Lupa Kata Sandi
                          </button>
                        </form>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="modal-login-karyawan">
        <ModalLogin onClose={handleOnClose} visible={showModal} />
      </div>
      <div className="modal-login-admin">
        {showModalAdmin && <ModalLoginAdmin onLogin={handleLoginAdmin} />}
      </div>
    </div>
  );
}

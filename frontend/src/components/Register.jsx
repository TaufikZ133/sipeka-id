//Entry Point
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//Import Modal
import ModalRegister from "../modal/ModalRegister.jsx";
//Asset
import show from "../assets/show.png";
import hide from "../assets/hide.png";
import register from "../assets/register.png";

export default function Register() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgPsw, setMsgPsw] = useState("");
  const [error, setError] = useState(false);
  const [registerGagal, setRegisterGagal] = useState(false);
  const [passwordBeda, setPasswordBeda] = useState(false);
  const navigate = useNavigate();

  const backTo = () => {
    navigate("/login");
  };

  const toggle = () => {
    setOpen(!open);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      email.length === 0 || nama.length === 0 || (password.length === 0) | (confPassword.length === 0)
    ) {
      setMsg(false);
      setMsgPsw(false);
      setError(true);
    }
    try {
      await axios.post(process.env.REACT_APP_API_URL+"/daftar", {
        nama: nama,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      setShowModal(true);
      setMsg(false);
      setMsgPsw(false);
      setError(false);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        setMsgPsw(error.response.data.msgPsw);
        setError(false);
        if (error.response.status === 404) {
          setRegisterGagal(true);
          setPasswordBeda(false);
        }
        if (error.response.status === 400) {
          setRegisterGagal(false);
          setPasswordBeda(true);
        }
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false)
    navigate("/login")
  }

  return (
    <div className="h-full w-full fixed left-0 top-0 flex justify-center items-center bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600">
      <div>
        <div className="w-[80rem] h-full bg-white rounded-3xl table-fixed animate-fade pb-10">
          <div className="pt-7">
            <table className="w-[10rem] h-[10rem] justify-center items-center mx-auto">
              <tbody>
                <tr>
                  <td className="">
                    <div>
                      <div className="flex flex-col justify-center mx-auto pb-5 border-r-2">
                        <div className="w-[40rem] h-full px-5 select-none ">
                          <h2 className="text-center text-black font-montserrat font-semibold leading-[28px] text-[24px] mt-2">
                            Selamat Datang
                          </h2>
                          <p className="text-center font-montserrat text-[15px] text-gray-400 ">
                            Di Halaman Register
                          </p>
                        </div>
                        <div className="px-10 pt-5 animate-fade ">
                          <img
                            className="px-auto h-[30rem] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.050] duration-300 "
                            src={register}
                            alt="register"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="pl-6">
                    <div>
                      <div className="flex flex-col justify-center mx-auto">
                        <form
                          onSubmit={handleSubmit}
                          className="w-full h-[580px] p-2 px-10 select-none"
                        >
                          <h2 className="text-center text-black font-semibold leading-[28px] text-[24px]">
                            Daftar
                          </h2>
                          <p className="text-center text-[15px] text-gray-400">
                            Sebagai Pengguna
                          </p>
                          <div className="flex flex-col text-black py-1 mx-5 mt-2">
                            <h5 className="font-montserrat font-semibold leading-[20px] text-[13px] ml-[17px]">
                              Nama
                            </h5>
                            <div className="control relative">
                              <input
                                onChange={(e) => {
                                  setNama(e.target.value);
                                  setRegisterGagal(false);
                                  setMsg(false);
                                }}
                                className={
                                    registerGagal
                                    ? "rounded-[6px] bg-gray-100 mt-2 ml-[17px] p-2 w-[348px] h-[48px] focus:bg-gray-100 text-red-600 focus:outline-none font-montserrat leading-[20px] text-[15px]"
                                    : "rounded-[6px] bg-gray-100 mt-2 ml-[17px] p-2 w-[348px] h-[48px] focus:bg-gray-100 focus:outline-none font-montserrat leading-[20px] text-[15px]"
                                }
                                placeholder="Masukan Nama"
                                value={nama}
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
                          <div className="flex flex-col text-black py-1 mx-5 mt-3">
                            <h5 className="font-montserrat font-semibold leading-[20px] text-[13px] ml-[17px]">
                              Email
                            </h5>
                            <div className="control relative">
                              <input
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                  setRegisterGagal(false);
                                  setMsg(false);
                                }}
                                className={
                                    registerGagal
                                    ? "rounded-[6px] bg-gray-100 mt-2 ml-[17px] p-2 w-[348px] h-[48px] focus:bg-gray-100 text-red-600 focus:outline-none font-montserrat leading-[20px] text-[15px]"
                                    : "rounded-[6px] bg-gray-100 mt-2 ml-[17px] p-2 w-[348px] h-[48px] focus:bg-gray-100 focus:outline-none font-montserrat leading-[20px] text-[15px]"
                                }
                                placeholder="Masukan Email"
                                value={email}
                                type="text"
                              />
                              {error && email.length <= 0 ? (
                                <p className="ml-[17px] text-red-500 font-montserrat font-medium leading-[16px] text-[12px] absolute">
                                  Email Tidak Boleh Kosong.
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col text-black py-4 mx-5 relative">
                            <label className="font-montserrat font-semibold leading-[20px] text-[13px] ml-[17px]">
                              Kata Sandi
                            </label>
                            <div className="control relative w-[348px] h-[48px] mx-center">
                              <input
                                onChange={(e) => {
                                  setPassword(e.target.value);
                                  setPasswordBeda(false);
                                  setMsgPsw(false);
                                }}
                                className={
                                  passwordBeda
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
                          <div className="flex flex-col text-black py-4 mx-5 relative">
                            <label className="font-montserrat font-semibold leading-[20px] text-[13px] ml-[17px]">
                              Konfirmasi Kata Sandi
                            </label>
                            <div className="control relative w-[348px] h-[48px] mx-center">
                              <input
                                onChange={(e) => {
                                  setConfPassword(e.target.value);
                                  setPasswordBeda(false);
                                  setMsgPsw(false);
                                }}
                                className={
                                  passwordBeda
                                    ? "rounded-[6px] bg-gray-100 mt-2 ml-[17px] p-2 w-[348px] h-[48px] focus:bg-gray-100 text-red-600 focus:outline-none font-montserrat leading-[20px] text-[15px]"
                                    : "rounded-[6px] bg-gray-100 mt-2 ml-[17px] p-2 w-[348px] h-[48px] focus:bg-gray-100 focus:outline-none font-montserrat leading-[20px] text-[15px]"
                                }
                                placeholder="Masukan Kata Sandi"
                                value={confPassword}
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
                              {error && confPassword.length <= 0 ? (
                                <p className="ml-[17px] text-red-500 font-montserrat font-medium leading-[16px] text-[12px]">
                                  Konfirm Password Tidak Boleh Kosong.
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <button className="font-montserrat font-semibold mt-5 text-[16px] ml-[40px] w-[348px] h-[50px] bg-emerald-500 rounded-[14px] text-white shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.1] duration-300">
                            Register
                          </button>
                          <button
                            onClick={backTo}
                            className="font-montserrat font-semibold mt-5 text-[16px] ml-[40px] w-[348px] h-[50px] bg-orange-600 rounded-[14px] text-white shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.1] duration-300"
                          >
                            Kembali
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
      {showModal && (<ModalRegister closeModal={handleCloseModal}/>)}
    </div>
  );
}

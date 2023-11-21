import React from "react";
//asset
import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
import card3 from "../assets/card3.png";
import card4 from "../assets/card4.png";
import landing from "../assets/landing-image.png";
//component
import Footer from "./Footer";

export default function Card() {
  return (
    <div className="mx-auto justify-center items-center text-center">
      <p className="text-[1.5rem] font-medium">Informasi Website</p>
      <p className="text-[1rem] py-2">
        Berikut merupakan informasi mengenai sistem informasi manajemen data
        karyawan
      </p>
      <div className="w-full h-full gap-[3rem] flex-wrap flex justify-center items-center py-[3rem]">
        <div className="w-80 p-2 bg-white border-2 border-gray-400 rounded-xl transform transition-all hover:-translate-y-2 duration-300 hover:shadow-2xl hover:scale-[1.10]">
          <img className="h-60 object-cover rounded-xl mx-auto" src={card1} alt="x" />
          <div className="p-2">
            <h2 className="font-bold text-lg mb-2 ">Kelola Penggajian</h2>
            <p className="text-sm text-gray-600">
              Kenali lebih tentang pengembangan sistem informasi
            </p>
          </div>
          <div className="m-2">
            <button className="text-white bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-700">
              Learn More
            </button>
          </div>
        </div>
        <div className="w-80 p-2 bg-white border-2 border-gray-400 rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.10]">
          <img className="h-60 object-cover rounded-xl mx-auto" src={card2} alt="x" />
          <div className="p-2">
            <h2 className="font-bold text-lg mb-2 ">Cetak Dokumen</h2>
            <p className="text-sm text-gray-600">
              Kenali lebih tentang pengembangan sistem informasi
            </p>
          </div>
          <div className="m-2">
            <button className="text-white bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-700">
              Learn More
            </button>
          </div>
        </div>
        <div className="w-80 p-2 bg-white border-2 border-gray-400 rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.10]">
          <img className="h-60 object-cover rounded-xl mx-auto" src={card3} alt="x" />
          <div className="p-2">
            <h2 className="font-bold text-lg mb-2 ">Kelola Presensi</h2>
            <p className="text-sm text-gray-600">
              Kenali lebih tentang pengembangan sistem informasi
            </p>
          </div>
          <div className="m-2">
            <button className="text-white bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-700">
              Learn More
            </button>
          </div>
        </div>
        <div className="w-80 p-2 bg-white border-2 border-gray-400 rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:scale-[1.10]">
          <img className="h-60 object-cover rounded-xl mx-auto" src={card4} alt="x" />
          <div className="p-2">
            <h2 className="font-bold text-lg mb-2 ">Fitur Chat</h2>
            <p className="text-sm text-gray-600">
              Kenali lebih tentang pengembangan sistem informasi
            </p>
          </div>
          <div className="m-2">
            <button className="text-white bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-700">
              Learn More
            </button>
          </div>
        </div>
      </div>
      <div className="pt-[7rem]">
        <table className="mx-auto justify-center items-center text-left">
          <tbody>
            <tr>
              <td className="w-[55rem]">
                <img
                  src={landing}
                  className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.050] duration-300"
                  alt="x"
                />
              </td>
              <td className="p-10">
                <p className="py-5 font-semibold text-[37px] text-blue-500">
                  How it Works?
                </p>
                <p className="py-3 font-semibold text-[19px]">
                  Sistem Informasi Manajemen Data Karyawan memudahkan anda dalam
                  melakukan pekerjaan seperti mengelola data karyawan,data
                  penggajian,membuat dokumen dan membuat surat
                </p>
                <p className="py-3 font-semibold text-[19px]">
                  &#x2022; Akses Dimana Saja
                </p>
                <p className="py-3 font-semibold text-[19px]">
                  &#x2022; Data Lebih Akurat
                </p>
                <p className="py-3 font-semibold text-[19px]">
                  &#x2022; Dokumen dan File Lebih Aman
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="pt-[7rem]">
        <Footer />
      </div>
    </div>
  );
}

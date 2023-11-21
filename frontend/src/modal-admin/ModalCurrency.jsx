import React, { useState } from "react";
import InputMask from "react-input-mask";

export default function ModalCurrency() {
  const [pemasukan, SetPemasukan] = useState(0);
  const [pemotongan, SetPemotongan] = useState(0);

  const TotalPemasukan = parseInt(pemasukan).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    currencyDisplay: "symbol",
  });

  const TotalPemotongan = parseInt(pemotongan).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    currencyDisplay: "symbol",
  });

  const HitungGajiBersih = pemasukan - pemotongan;

  const GajiBersih = parseInt(HitungGajiBersih).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    currencyDisplay: "symbol",
  });

  return (
    <section>
      <div>
        Perhitungan Gaji
        <p>Pemasukan Kamu : {TotalPemasukan}</p>
        <p>Pemotongan Kamu : {TotalPemotongan}</p>
        <p>Gaji Bersih Kamu : {GajiBersih}</p>
        <div className="form">
          <form>
            <InputMask
              className="rounded-[6px] select-none bg-white flex mt-1 mb-5 border-2 border-black"
              placeholder="Masukan Angka"
              type="number"
              value={pemasukan}
              onChange={(e) => SetPemasukan(e.target.value)}
            />
            <input
              className="rounded-[6px] select-none bg-white flex mt-1 mb-5 border-2 border-black"
              placeholder="Belum di Update"
              type="number"
              value={pemotongan}
              onChange={(e) => SetPemotongan(e.target.value)}
            />
          </form>
        </div>
      </div>
    </section>
  );
}

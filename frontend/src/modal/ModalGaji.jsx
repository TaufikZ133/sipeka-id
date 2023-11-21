//Dependencies
import React from "react";
import moment from "moment";
import "moment/locale/id";
//Asset
import close from "../assets/close.png";
import approved from "../assets/approved.png";
//PDF Renderer
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
    fontSize: 12,
    width: 1100,
    lineHeight: 1.8,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  textCompanyInfo: {
    display: "flex",
    alignItems: "left",
    textAlign: "left",
  },
  header: {
    flexDirection: "column",
    borderBottomWidth: 2,
    borderBottomColor: "#112131",
    borderBottomStyle: "solid",
    alignItems: "center",
    margin: "30",
    marginTop: "20",
    marginBottom: "20",
    padding: "5",
  },
  transaksi: {
    flexDirection: "column",
    margin: "30",
    marginTop: "5",
    marginBottom: "20",
  },
  approve: {
    width: 124,
    height: "auto",
    marginLeft: "auto",
    marginRight: "20",
  },
});

const createTableHeader = () => {
  return (
    <View style={tableRowStyle} fixed>
      <View style={firstTableColHeaderStyle}>
        <Text style={tableCellHeaderStyle}>Pemasukan</Text>
      </View>

      <View style={tableColHeaderStyle}>
        <Text style={tableCellHeaderStyle}>Nominal</Text>
      </View>

      <View style={tableColHeaderStyle}>
        <Text style={tableCellHeaderStyle}>Pegurangan</Text>
      </View>

      <View style={tableColHeaderStyle}>
        <Text style={tableCellHeaderStyle}>Nominal</Text>
      </View>
    </View>
  );
};

const TableRowFirst = (data) => {
  return (
    <View style={tableRowStyle}>
      <View style={firstTableColStyle}>
        <Text style={tableCellStyle}>Gaji Pokok</Text>
      </View>

      <View style={tableColStyle}>
        <Text style={tableCellStyle}>{data.gaji_pokok}</Text>
      </View>

      <View style={tableColStyle}>
        <Text style={tableCellStyle}>PPH21</Text>
      </View>

      <View style={tableColStyle}>
        <Text style={tableCellStyle}>{data.pph21}</Text>
      </View>
    </View>
  );
};

const TableRowSecond = (data) => {
  return (
    <View style={tableRowStyle}>
      <View style={firstTableColStyle}>
        <Text style={tableCellStyle}>Tunjangan Tetap</Text>
      </View>

      <View style={tableColStyle}>
        <Text style={tableCellStyle}>{data.tunjangan_tetap}</Text>
      </View>

      <View style={tableColStyle}>
        <Text style={tableCellStyle}>Denda</Text>
      </View>

      <View style={tableColStyle}>
        <Text style={tableCellStyle}>{data.denda_pelanggaran}</Text>
      </View>
    </View>
  );
};

const TableRowThird = (data) => {
  return (
    <View style={tableRowStyle}>
      <View style={firstTableColStyle}>
        <Text style={tableCellStyle}>Tunjangan Tidak Tetap</Text>
      </View>

      <View style={tableColStyle}>
        <Text style={tableCellStyle}>{data.tunjangan_tidak_tetap}</Text>
      </View>

      <View style={tableColStyle}>
        <Text style={tableCellStyle}>-</Text>
      </View>

      <View style={tableColStyle}>
        <Text style={tableCellStyle}>-</Text>
      </View>
    </View>
  );
};

const TableRowFourth = (data) => {
  return (
    <View style={tableRowStyle}>
      <View style={firstTableColStyle}>
        <Text style={tableCellStyle}>Total Pemasukan</Text>
      </View>

      <View style={tableColStyle}>
        <Text style={tableCellStyle}>{data.total_pendapatan}</Text>
      </View>

      <View style={tableColStyle}>
        <Text style={tableCellStyle}>Total Pengurangan</Text>
      </View>

      <View style={tableColStyle}>
        <Text style={tableCellStyle}>{data.total_pengurangan}</Text>
      </View>
    </View>
  );
};

const GajiBersih = (data) => {
  return (
    <View style={tableRowStyle}>
      <View>
        <Text style={PendapatanBersih}>Pendapatan Bersih</Text>
      </View>

      <View>
        <Text style={NominalPendapatanBersih}>{data.penerimaan_bersih}</Text>
      </View>
    </View>
  );
};

const PendapatanBersih = {
  alignItems: "center",
  textAlign: "center",
  marginTop: "30",
  marginLeft: "100",
  padding: "5",
  borderLeft: "1px solid #333",
  borderTop: "1px solid #333",
  borderBottom: "1px solid #333",
  borderRight: "0px",
  width: "120px",
};

const NominalPendapatanBersih = {
  alignItems: "center",
  textAlign: "center",
  marginTop: "30",
  padding: "5",
  width: "120px",
  border: "1px solid #333",
};

const tableStyle = {
  display: "table",
  marginLeft: "auto",
  padding: "15",
};

const tableRowStyle = {
  flexDirection: "row",
};

const firstTableColHeaderStyle = {
  width: "22%",
  borderStyle: "solid",
  borderColor: "#000",
  borderBottomColor: "#000",
  borderWidth: 1,
  backgroundColor: "#bdbdbd",
};

const tableColHeaderStyle = {
  width: "22%",
  borderStyle: "solid",
  borderColor: "#000",
  borderBottomColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  backgroundColor: "#bdbdbd",
};

const firstTableColStyle = {
  width: "22%",
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 1,
  borderTopWidth: 0,
};

const tableColStyle = {
  width: "22%",
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  borderTopWidth: 0,
};

const tableCellHeaderStyle = {
  textAlign: "left",
  margin: 4,
  fontSize: 12,
  fontWeight: "bold",
};

const tableCellStyle = {
  textAlign: "left",
  margin: 5,
  fontSize: 10,
};

// Isi Dari PDF Slip Gaji
const DataSlipGaji = (props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>Slip Gaji Karyawan </Text>
        <Text>Sistem Informasi Manajemen Data Karyawan </Text>
      </View>
      <View style={styles.transaksi}>
        <Text>Nama : {props.karyawan.nama}</Text>
        <Text>NIK : {props.karyawan.nik}</Text>
        <Text>Jabatan : {props.karyawan.jabatan}</Text>
        <Text>Departemen : {props.karyawan.departemen}</Text>
        <Text>Periode Bulan Penggajian : {moment(props.data.bulan_penggajian).format("MMMM YYYY")}</Text>
        <Text
          style={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            fontSize: "16px",
            marginTop: "20",
            borderTop: "2px solid #333",
            paddingTop: "20",
          }}
        >
          Detail Slip Gaji
        </Text>
      </View>
      <View style={tableStyle}>
        {createTableHeader(props.data)}
        {TableRowFirst(props.data)}
        {TableRowSecond(props.data)}
        {TableRowThird(props.data)}
        {TableRowFourth(props.data)}
        {GajiBersih(props.data)}
      </View>
      <View style={styles.transaksi}>
        <Text
          style={{
            borderTop: "2px solid #333",
            paddingTop: "20",
            marginTop: "10",
          }}
        >
          Keterangan : {props.data.keterangan}
        </Text>
        <Text style={styles.approve}>Mengetahui Admin</Text>
        <Image source={String(approved)} style={styles.approve} />
        <Text style={styles.approve}>Admin, {moment(props.data.createdAt).format("DD MMMM YYYY")}</Text>
      </View>
    </Page>
  </Document>
);

const ModalGaji = (props) => {
  return (
    <div className="h-full w-full fixed left-0 top-0 font-montserrat justify-center items-center bg-black bg-opacity-50 overflow-y-scroll">
      <div className="bg-white animate-fade rounded-[13px] shadow-lg w-[70rem] pb-[2rem] my-10 mx-auto ">
        <div className="p-3 border-solid border-b-2 border-gray-200 py-5">
          <div className="float-right">
            <img
              onClick={props.closePDF}
              className="cursor-pointer"
              src={close}
              alt="close"
            />
          </div>
          <h3 className="font-semibold text-[18px] leading-[22px]">
            Detail Slip Gaji {props.karyawan.nama}
          </h3>
        </div>
        <PDFViewer style={{ width: 1100, height: 700 }}>
          <DataSlipGaji data={props.data} karyawan={props.karyawan}/>
        </PDFViewer>
      </div>
    </div>
  );
};

export default ModalGaji;

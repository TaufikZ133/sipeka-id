//Dependencies
import React from "react";
import moment from "moment";
import "moment/locale/id";
//Asset
import close from "../assets/close.png";
//PDF Renderer
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
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
  textNormal: {
    flexDirection: "column",
    margin: "30",
    marginTop: "5",
    marginBottom: "20",
    fontSize: 11,
  },
  textFooter: {
    height: "auto",
    marginLeft: "auto",
    marginRight: "20",
  },
  nameFooter: {
    height: "auto",
    marginLeft: "auto",
    marginRight: "20",
    textDecoration: "underline",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "30%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    paddingHorizontal: 20,
  },
  nomer: {
    width: "5%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    paddingHorizontal: 20,
  },
  tanggal: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    paddingHorizontal: 20,
  },
  jenis: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    paddingHorizontal: 20,
  },
  keterangan: {
    width: "10%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    paddingHorizontal: 20,
  },
  tableCell: {
    margin: "auto",
    marginTop: 3,
    fontSize: 9,
  },
  tableCellHead: {
    margin: "auto",
    marginTop: 3,
    fontSize: 10,
    backgroundColor: "#bdbdbd",
  },
});

// Isi Dari PDF Slip Gaji
const date = moment().format("DD MMMM YYYY");
const DataPresensi = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>Lembar Presensi Karyawan</Text>
        <Text>Bandung, {date}</Text>
      </View>
      <View style={styles.textNormal}>
        <Text>Nama : {data[0].nama}</Text>
        <Text>NIK : 2013201001</Text>
      </View>
      <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginHorizontal: "40",
          }}>
        <View style={styles.tableRow}>
          <View style={styles.nomer}>
            <Text style={styles.tableCellHead}>No</Text>
          </View>
          <View style={styles.tanggal}>
            <Text style={styles.tableCell}>Tanggal</Text>
          </View>
          <View style={styles.jenis}>
            <Text style={styles.tableCell}>Presensi</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Keterangan</Text>
          </View>
        </View>
      </View>
      {data.map((item, index) => (
      <View key={item.id.toString()}
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginHorizontal: "40",
          }}>
        <View style={styles.tableRow}>
          <View style={styles.nomer}>
            <Text style={styles.tableCell}>{index + 1}</Text>
          </View>
          <View style={styles.tanggal}>
            <Text style={styles.tableCell}>{moment(item.createdAt).format("dddd, DD MMMM YYYY, hh:mm A")}</Text>
          </View>
          <View style={styles.jenis}>
            <Text style={styles.tableCell}>{item.jenis_presensi}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{item.keterangan}</Text>
          </View>
        </View>
      </View>
      ))}
    </Page>
  </Document>
);

const ModalCetakPresensi = (props) => {
  return (
    <div className="h-full w-full fixed left-0 top-0 font-montserrat justify-center items-center bg-black bg-opacity-50 overflow-y-scroll">
      <div className="bg-white animate-fade rounded-[13px] shadow-lg w-[70rem] pb-[2rem] my-10 mx-auto ">
        <div className="p-3 border-solid border-b-2 border-gray-200 py-5">
          <div className="float-right">
            <img
              onClick={props.CloseCetakPresensi}
              className="cursor-pointer"
              src={close}
              alt="close"
            />
          </div>
          <h3 className="font-semibold text-[18px] leading-[22px]">
            Lembar Presensi Karyawan
          </h3>
        </div>
        <PDFViewer style={{ width: 1100, height: 700 }}>
          <DataPresensi data={props.data} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default ModalCetakPresensi;

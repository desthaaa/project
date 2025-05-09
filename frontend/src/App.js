// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <a></a>
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//           sweetfaoryyyyy
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import BarangForm from "./components/BarangForm";
// import BarangList from "./components/BarangList";
// import "./App.css";

// function App() {
//   const [barangs, setBarangs] = useState([]);
//   const [editingBarang, setEditingBarang] = useState(null);

//   const fetchBarangs = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/barangs");
//       setBarangs(response.data);
//     } catch (error) {
//       console.error("Gagal mengambil data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBarangs();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/barangs/${id}`);
//       fetchBarangs();
//     } catch (error) {
//       console.error("Gagal menghapus:", error);
//     }
//   };

//   const handleSubmit = async (barang) => {
//     try {
//       if (barang._id) {
//         await axios.put(`http://localhost:5000/api/barangs/${barang._id}`, barang);
//       } else {
//         await axios.post("http://localhost:5000/api/barangs", barang);
//       }
//       fetchBarangs();
//       setEditingBarang(null);
//     } catch (error) {
//       console.error("Gagal menyimpan:", error);
//     }
//   };

//   const handleEdit = (barang) => {
//     setEditingBarang(barang);
//   };

//   return (
//     <div className="app-container">
//       <h1>Manajemen Barang</h1>
//       <BarangForm onSubmit={handleSubmit} initialBarang={editingBarang} />
//       <BarangList barangs={barangs} onDelete={handleDelete} onEdit={handleEdit} />
//     </div>
//   );
// }

// export default App;

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import BarangPage from "./pages/BarangPage";

function App() {
  return (
    <ChakraProvider>
      <BarangPage />
    </ChakraProvider>
  );
}

export default App;
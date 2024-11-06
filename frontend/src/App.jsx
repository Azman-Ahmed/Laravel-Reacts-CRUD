import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import TemplatesTable from "./TemplatesTable";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import ViewTemplate from "./ViewTemplate";
import Edit from "./Edit";
import Create from "./Create";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/tada');
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<TemplatesTable data={paginatedData} fetchData={fetchData} itemsPerPage={10} />} />
        <Route path="/create" element={<Create fetchData={fetchData} />} />
        <Route path="/view" element={<ViewTemplate />} />
        <Route path="/edit" element={<Edit fetchData={fetchData} />} />
      </>
    )
  );

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <TopNav />
        <RouterProvider router={router} />
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

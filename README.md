# BackEnd

```bash
laravel new Backend
cd Backend
composer run --dev
php serve artisan

php artisan make:controller DataController
php artisan make:mode Data -m
php artisan make:factory DataFactory --model=Data


```



# Frontend

```bash
npm create vite@latest
npm install
npm run dev

npm install react-router-dom
npm install react-toastify
npm install axios


```





### rafff



import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import axios from "axios"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter and Routes
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import TemplatesTable from "./TemplatesTable";
import ViewTemplate from "./ViewTemplate";
import Edit from "./Edit";
import Create from "./Create";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/tada');
        console.log("Fetched Data:", response.data); 
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <Router> {/* Wrap your app in Router */}
      <Sidebar />
      <TopNav />
      <Routes> {/* Define your routes here */}
        <Route path="/" element={<TemplatesTable data={data} />} />
        <Route path="/view/:id" element={<ViewTemplate />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
}

export default App;

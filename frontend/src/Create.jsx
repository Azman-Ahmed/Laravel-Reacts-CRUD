import './App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './components/Form';
import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios

const Create = ({ fetchData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    creator: '',
    creator_type: '',
    status: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTemplate = {
      id: Date.now().toString(), 
      ...formData
    };

    console.log(newTemplate);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/add', newTemplate);
      console.log(response.data);
      toast.success("New template created successfully!");
      await fetchData();
      navigate('/');
    } catch (error) {
      console.error("Error creating template:", error);
      toast.error("Failed to create template. Please try again.");
    }
  };

  return (
    <div>
      <h2>Create New Template</h2>
      <Form 
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        mode="create"
      />
    </div>
  );
};

export default Create;

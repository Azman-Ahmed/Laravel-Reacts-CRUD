import React, { useState, useEffect } from 'react';
import { Await, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Form from './components/Form';
import axios from 'axios'; // Import axios

const Edit = ({ fetchData }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ensure that you handle the case where state might be null
  const { id, name, description, creator, creator_type, status } = location.state || {};

  const [formData, setFormData] = useState({
    id: id || '', // Initialize the id for the update
    name: name || '',
    description: description || '',
    creator: creator || '',
    creator_type: creator_type || '',
    status: status || ''
  });

  useEffect(() => {
    // Set form data if available
    if (location.state) {
      setFormData({
        id,
        name,
        description,
        creator,
        creator_type,
        status
      });
    }
  }, [location.state, id, name, description, creator, creator_type, status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/update/${formData.id}`, formData);
      console.log(response.data);
      
      toast.success("Template updated successfully!");


      await fetchData();
      // Navigate to the home page after fetching the updated data
      navigate('/'); 
    }
    catch (error) {
      console.error("Error updating template:", error);
      toast.error("Failed to update template. Please try again.");
    }
};


  return (
    <div>
      <h2>Edit Template</h2>
      <Form 
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        mode="edit"
      />
    </div>
  );
};

export default Edit;

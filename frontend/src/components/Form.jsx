import React from 'react';
import { Link } from 'react-router-dom'; 

const Form = ({ formData, handleChange, handleSubmit, mode }) => {  
  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Creator:
          <input
            type="text"
            name="creator"
            value={formData.creator}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Creator Type:
          <input
            type="text"
            name="creator_type" // Ensure this matches the key in formData
            value={formData.creator_type} // Change to access the correct state property
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Status:
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select a status</option>
            <option value="pending">pending</option>
            <option value="in-progress">in-progress</option>
            <option value="completed">Completed</option>

          </select>
        </label>
        {console.log(formData, "hehe")}
        <button type="submit">
          {mode === 'create' ? 'Create Template' : 'Update Template'}
        </button>

        <Link to="/">
          <button type="button">Back to Home</button>  
        </Link>
      </form>
    </div>
  );
};

export default Form;

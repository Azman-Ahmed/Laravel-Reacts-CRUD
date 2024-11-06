import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const TemplatesTable = ({ data, fetchData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCreator, setFilterCreator] = useState('');
  const [filterCreatorType, setFilterCreatorType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const uniqueCreators = [...new Set(data.map(template => template.creator))];
  const uniqueCreatorTypes = [...new Set(data.map(template => template.creator_type))];
  const uniqueStatuses = [...new Set(data.map(template => template.status))];

  const filteredData = data.filter(({ name, description, creator, creator_type, status }) => {
    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch = name.toLowerCase().includes(lowerSearch) || 
                          description.toLowerCase().includes(lowerSearch) || 
                          creator.toLowerCase().includes(lowerSearch) || 
                          creator_type.toLowerCase().includes(lowerSearch);
    const matchesCreator = filterCreator ? creator === filterCreator : true;
    const matchesCreatorType = filterCreatorType ? creator_type === filterCreatorType : true;
    const matchesStatus = filterStatus ? status === filterStatus : true;

    return matchesSearch && matchesCreator && matchesCreatorType && matchesStatus;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this template?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/delete/${id}`);
        toast.success("Deleted Successfully");
        await fetchData();
      } catch (error) {
        console.error("Error deleting template:", error);
        toast.error("Failed");
      }
    }
  };

  return (
    <div className="templates-table">
      <ToastContainer />
      <div className="button-container">
        <Link to="/create">
          <button className="create-button">Create New</button>
        </Link>
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filter-container">
        <select value={filterCreator} onChange={(e) => setFilterCreator(e.target.value)}>
          <option value="">All Creators</option>
          {uniqueCreators.map(creator => (
            <option key={creator} value={creator}>{creator}</option>
          ))}
        </select>

        <select value={filterCreatorType} onChange={(e) => setFilterCreatorType(e.target.value)}>
          <option value="">All Creator Types</option>
          {uniqueCreatorTypes.map(creatorType => (
            <option key={creatorType} value={creatorType}>{creatorType}</option>
          ))}
        </select>

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Statuses</option>
          {uniqueStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Creator</th>
            <th>Creator Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="dashboard">
          {paginatedData.map(({ id, name, description, creator, creator_type, status }) => (
            <tr key={id}>
              <td>{name.split(" ").slice(0, 3).join(" ")}{name.split(" ").length > 3 ? '...' : ''}</td>
              <td>{description.split(" ").slice(0, 2).join(" ")}{description.split(" ").length > 5 ? '...' : ''}</td>
              <td>{creator}</td>
              <td>{creator_type}</td>
              <td><span className="status">{status}</span></td>
              <td>
                <Link to={'/view'} state={{ id, name, description, creator, creator_type, status }}>
                  <button>View</button>
                </Link>
                <Link to={'/edit'} state={{ id, name, description, creator, creator_type, status }}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <span>Page {currentPage} of {totalPages}</span>
      </div>

      
    </div>
  );
};

export default TemplatesTable;

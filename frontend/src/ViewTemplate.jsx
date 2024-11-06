import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ViewTemplate = () => {
    const location = useLocation();
    const { id, name, description, creator, creator_type, status } = location.state || {};

    const templateDetails = [
        { label: 'ID', value: id },
        { label: 'Name', value: name },
        { label: 'Description', value: description },
        { label: 'Creator', value: creator },
        { label: 'Creator Type', value: creator_type },
        { label: 'Status', value: <span className="status">{status}</span> },
    ];

    return (
        <div>
            <div className="view-template">
                <h1>Template Details</h1>
                <div className="template-info">
                    {templateDetails.map(({ label, value }) => (
                        <p key={label}>
                            <strong>{label}:</strong> {value}
                        </p>
                    ))}
                </div>
            </div>
            <div className='form-container'>
                <Link to={'/'}>
                    <button>Back to Home</button>
                </Link>
            </div>
        </div>
    );
};

export default ViewTemplate;

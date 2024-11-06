'use client';

import React from 'react';

interface TemplateData {
    id: number;
    name: string;
    description: string;
    creator: string;
    creator_type: string;
    status: string;
}

interface TemplatesTableProps {
    data: TemplateData[]; 
    error: Error | null;
}

const TemplatesTable: React.FC<TemplatesTableProps> = ({ data, error }) => {
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Creator</th>
                        <th>Creator Type</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(({ id, name, description, creator, creator_type, status }) => (
                        <tr key={id}>
                            <td>
                                {name.split(" ").slice(0, 3).join(" ")}
                                {name.split(" ").length > 3 ? '...' : ''}
                            </td>
                            <td>
                                {description.split(" ").slice(0, 5).join(" ")}
                                {description.split(" ").length > 5 ? '...' : ''}
                            </td>
                            <td>{creator}</td>
                            <td>{creator_type}</td>
                            <td><span className="status">{status}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TemplatesTable;

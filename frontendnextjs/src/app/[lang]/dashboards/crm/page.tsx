'use client';

import useSWR from 'swr';
import React from 'react';

import Sidebar from "../../../view/Sidebar";
import TopNav from "../../../view/TopNav";
import TemplatesTable from "../../../view/TemplateTable";

export default function Home() {
    const fetcher = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/tada');
        if (!response.ok) {
            throw new Error('Response not Found');
        }
        return await response.json();
    };

    const { data, error } = useSWR('http://127.0.0.1:8000/api/tada', fetcher);

    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <TopNav />
                <TemplatesTable data={data} error={error} />
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const candidatesData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    skills: 'JavaScript, React',
    bio: 'Experienced React developer with a passion for creating interactive applications.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '987-654-3210',
    skills: 'Python, Django',
    bio: 'Skilled in building web applications with Python and Django framework.',
  },
  // Add more candidates as needed
];

const CandidateTable = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const columns = [
    { headerName: 'Name', field: 'name', filter: true },
    { headerName: 'Email', field: 'email', filter: true },
    { headerName: 'Phone', field: 'phone', filter: true },
    { headerName: 'Skills', field: 'skills', filter: true },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRendererFramework: (params) => (
        <button
          className="bg-blue-500 text-white py-1 px-2 rounded"
          onClick={() => setSelectedCandidate(params.data)}
        >
          View More
        </button>
      ),
    },
  ];

  const closeModal = () => {
    setSelectedCandidate(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="ag-theme-alpine h-96">
        <AgGridReact
          rowData={candidatesData}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={5}
          filter={true}
        />
      </div>

      {selectedCandidate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 w-96">
            <h2 className="text-xl font-bold">{selectedCandidate.name}</h2>
            <p><strong>Email:</strong> {selectedCandidate.email}</p>
            <p><strong>Phone:</strong> {selectedCandidate.phone}</p>
            <p><strong>Skills:</strong> {selectedCandidate.skills}</p>
            <p><strong>Bio:</strong> {selectedCandidate.bio}</p>
            <button
              className="mt-4 bg-red-500 text-white py-1 px-2 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateTable;

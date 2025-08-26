import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Box, Button } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([ AllCommunityModule ]);

import ConfirmDialog from "../components/ConfirmDialog";
import Layout from "../layout/Layout";

import axios from "axios";
// Page to list, filter, and manage employees
export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [confirmId, setConfirmId] = useState(null);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  // Fetch employees from API, optionally filtering by cafe
  const fetchEmployees = async () => {
    const res = await axios.get(import.meta.env.VITE_API_URL + "/employees");
    let list = res.data;
    const cafe = params.get("cafe");
    if (cafe) list = list.filter((e) => e.cafe === cafe);
    setEmployees(list);
  };
  // Load employees on component mount or when search params change
  useEffect(() => {
    fetchEmployees();
  }, [params]);
  // Handle employee deletion with confirmation
  const handleDelete = async () => {
    await axios.delete(import.meta.env.VITE_API_URL + `/employees/${confirmId}`);
    setConfirmId(null);
    fetchEmployees();
  };
  // Define columns for the data grid
  const columns = [
    { headerName: "ID", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email_address" },
    { headerName: "Phone", field: "phone_number" },
    { headerName: "Days Worked", field: "days_worked" },
    { headerName: "Cafe", field: "cafe" },
    {
      headerName: "Actions",
      cellRenderer: (p) => (
        <>
          <Button onClick={() => navigate(`/employees/${p.data.id}`)}>Edit</Button>
          <Button color="error" onClick={() => setConfirmId(p.data.id)}>Delete</Button>
        </>
      ),
    },
  ];
  // Render the employees page with data grid and controls
  return (
    <Layout>
      <Box mb={2}>
        <Button variant="contained" onClick={() => navigate("/employees/new")}>Add New Employee</Button>
      </Box>

      <div className="ag-theme-alpine" style={{ width:1200, height: 400 }}>
        <AgGridReact rowData={employees} columnDefs={columns} />
      </div>

      <ConfirmDialog
        open={!!confirmId}
        title="Confirm Delete"
        message="Are you sure you want to delete this employee?"
        onCancel={() => setConfirmId(null)}
        onConfirm={handleDelete}
      />
    </Layout>
  );
}

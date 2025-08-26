import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Box, Button, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ConfirmDialog from "../components/ConfirmDialog";
import Layout from "../layout/Layout";

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([ AllCommunityModule ]);

export default function CafesPage() {
  const [cafes, setCafes] = useState([]);
  const [location, setLocation] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const navigate = useNavigate();

  const fetchCafes = async () => {
    const res = await axios.get(import.meta.env.VITE_API_URL + "/cafes");
    setCafes(res.data);
  };

  useEffect(() => {
    fetchCafes();
  }, []);

  const handleDelete = async () => {
    const res = await axios.get(import.meta.env.VITE_API_URL + "/cafes/${confirmId}");
    if (res.data.employees > 0) {
      alert("Cannot delete cafe with employees");
      setConfirmId(null);
      return;
    }
    await axios.delete(import.meta.env.VITE_API_URL + `/cafes/${confirmId}`);
    setConfirmId(null);
    fetchCafes();
  };

  const columns = [
    { headerName: "Logo", field: "logo", cellRenderer: (p) => <img src={p.value} alt="" width="40" /> },
    { headerName: "Name", field: "name" },
    { headerName: "Description", field: "description" },
    { headerName: "Employees", field: "employees",
      cellRenderer: (p) => (
        <Button onClick={() => navigate(`/employees?cafe=${p.data.name}`)}>{p.value}</Button>
      )
    },
    { headerName: "Location", field: "location" },
    {
      headerName: "Actions",
      cellRenderer: (p) => (
        <>
          <Button onClick={() => navigate(`/cafes/${p.data.id}`)}>Edit</Button>
          <Button color="error" onClick={() => {
            if (p.data.employees > 0) {
              alert("Cannot delete cafe with employees");
              return;
            }
            setConfirmId(p.data.id)}}>Delete</Button>
        </>
      ),
    },
  ];

  const filtered = location ? cafes.filter((c) => c.location === location) : cafes;
  const locations = [...new Set(cafes.map((c) => c.location))];

  return (
    <Layout>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button variant="contained" onClick={() => navigate("/cafes/new")}>Add New Cafe</Button>
        <Select value={location} onChange={(e) => setLocation(e.target.value)} displayEmpty>
          <MenuItem value="">All Locations</MenuItem>
          {locations.map((loc) => <MenuItem key={loc} value={loc}>{loc}</MenuItem>)}
        </Select>
      </Box>

      <div className="ag-theme-alpine" style={{ width:1200, height: 400 }}>
        <AgGridReact rowData={filtered} columnDefs={columns} />
      </div>

      <ConfirmDialog
        open={!!confirmId}
        title="Confirm Delete"
        message="Are you sure you want to delete this cafe?"
        onCancel={() => setConfirmId(null)}
        onConfirm={handleDelete}
      />
    </Layout>
  );
}

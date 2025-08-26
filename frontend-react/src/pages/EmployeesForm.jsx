import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, RadioGroup, FormControlLabel, Radio, MenuItem } from "@mui/material";

import axios from "axios";
import Layout from "../layout/Layout";
import UnsavedChanges from "../hooks/UnsavedChanges";

export default function EmployeeFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email_address: "", phone_number: "", gender: "Male", start_date:"", cafe_id: "" });
  const [cafes, setCafes] = useState([]);
  const { Prompt, setChanges } = UnsavedChanges();

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + "/cafes").then((res) => setCafes(res.data));
    if (id) {
      axios.get(import.meta.env.VITE_API_URL + `/employees/${id}`).then((res) => {
        res.data.start_date = res.data.start_date.slice(0,10);
        setForm(res.data);
        console.log(res.data);
      } 
      );
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name.length < 6 || form.name.length > 10) {
      alert("Name must be 6 to 10 letters");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email_address)) {
      alert("Invalid email");
      return;
    }
    if (!/^[89]\d{7}$/.test(form.phone_number)) {
      alert("Phone must be 8 digits starting with 8 or 9");
      return;
    }
    if (!form.start_date) {
        alert("Please select a start date");
        return;
    }
    if (!form.cafe_id) {
      alert("Please select a cafe");
      return;
    }

    try {
      if (id) {
        await axios.put(import.meta.env.VITE_API_URL + "/employees", form);
      } else {
        await axios.post(import.meta.env.VITE_API_URL + "/employees", form);
      }
      setChanges(false);
      setTimeout(() => navigate("/employees"), 100);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Layout>
      <Prompt />
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} required />
          <TextField label="Email" name="email_address" value={form.email_address} onChange={handleChange} required />
          <TextField label="Phone" name="phone_number" value={form.phone_number} onChange={handleChange} required />
          
          <RadioGroup row name="gender" value={form.gender} onChange={handleChange}>
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel value="Female" control={<Radio />} label="Female" />
          </RadioGroup>

          <TextField label="Date" name="start_date" type="date" value={form.start_date} onChange={handleChange} required />

          <TextField select label="Assigned Cafe" name="cafe_id" value={form.cafe_id} onChange={handleChange} required >
            {cafes.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>

          <Box display="flex" gap={2}>
            <Button variant="contained" type="submit">
              Save
            </Button>
            <Button variant="outlined" onClick={() => navigate("/employees")}>
              Cancel
            </Button>
          </Box>
        </Box>
      </form>
    </Layout>
  );
}

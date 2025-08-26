import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";

import axios from "axios";
import Layout from "../layout/Layout";
import UnsavedChanges from "../hooks/UnsavedChanges";
// Form page for creating or editing a cafe
export default function CafeFormPage() {
  const { id } = useParams(); // new or existing
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", description: "", location: "", logo: null });
  const [touched, setTouched] = useState(false);
  const { Prompt, setChanges } = UnsavedChanges();
  // Load existing cafe data if editing
  useEffect(() => {
    if (id) {
      axios.get(import.meta.env.VITE_API_URL + `/cafes/${id}`).then((res) => setForm(res.data));
    }
  }, [id]);
  // Set changes if form is touched
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((f) => ({ ...f, [name]: files ? files[0] : value }));
    setTouched(true);
    setChanges(true);
  };
  // Handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name.length < 6 || form.name.length > 10) {
      alert("Name must be between 6 and 10 letters");
      return;
    }
    if (form.description.length > 256) {
      alert("Description too long");
      return;
    }
    if (form.logo && form.logo.size > 2 * 1024 * 1024) {
      alert("Logo file must be less than 2MB");
      return;
    }
    // Submit form data
    try {
      if (id) {
        await axios.put(import.meta.env.VITE_API_URL + "/cafes", form);
      } else {
        await axios.post(import.meta.env.VITE_API_URL + "/cafes", form);
      }
      setTouched(false);
      setChanges(false);
      setTimeout(() => navigate("/cafes"), 100);
    } catch (err) {
      console.error(err.message);
    }
  };
  // Render form with unsaved changes prompt
  return (
    <Layout>
      <Prompt />
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} required />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} multiline />
          <TextField label="Location" name="location" value={form.location} onChange={handleChange} />
          <Button variant="outlined" component="label">
            Upload Logo
            <input type="file" hidden name="logo" onChange={handleChange} />
          </Button>

          <Box display="flex" gap={2}>
            <Button variant="contained" type="submit">
              Save
            </Button>
            <Button variant="outlined" onClick={() => navigate("/cafes")}>
              Cancel
            </Button>
          </Box>
        </Box>
      </form>
    </Layout>
  );
}

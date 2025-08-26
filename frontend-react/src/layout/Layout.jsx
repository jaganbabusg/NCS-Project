import { AppBar, Toolbar, Typography, Container, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Cafes & Employees Management
          </Typography>
          <Box>
            <Button color="inherit" onClick={() => navigate("/cafes")}>
              Cafes
            </Button>
            <Button color="inherit" onClick={() => navigate("/employees")}>
              Employees
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>{children}</Container>
    </>
  );
}

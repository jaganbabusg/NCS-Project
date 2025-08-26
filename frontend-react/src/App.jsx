import { Routes, Route } from "react-router-dom";
import CafesPage from "./pages/CafesPage";
import EmployeesPage from "./pages/EmployeesPage";
import CafesForm from "./pages/CafesForm";
import EmployeesForm from "./pages/EmployeesForm";

export default function App() {
  return (
    <Routes>
      //Routes for Cafes and Default Page
      <Route path="/" element={<CafesPage />} />
      <Route path="/cafes" element={<CafesPage />} />
      <Route path="/cafes/new" element={<CafesForm />} />
      <Route path="/cafes/:id" element={<CafesForm />} />
      //Routes for Employees
      <Route path="/employees" element={<EmployeesPage />} />
      <Route path="/employees/new" element={<EmployeesForm />} />
      <Route path="/employees/:id" element={<EmployeesForm />} />
    </Routes>
  );
}

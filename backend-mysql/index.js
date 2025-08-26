// default imports
const express = require("express");
const cors = require("cors");
require("dotenv").config();
// module imports
const cafesRoutes = require("./routes/cafesRoutes");
const employeesRoutes = require("./routes/employeesRoutes");
// configuration
const app = express();
app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));
// routes
app.use("/cafes", cafesRoutes);
app.use("/employees", employeesRoutes);
// server
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

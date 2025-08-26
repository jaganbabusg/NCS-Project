Cafes and Employees Management

This project is a full-stack technical assessment consisting of:
Backend: RESTful API built with Node.js (Express) and a relational database (Postgres/MySQL/MSSQL supported)
Frontend: React app built with Vite, using Ag-Grid for tables and Material-UI (MUI) for components.
The system manages cafés and employees, along with their relationships.

Features
Backend
REST API with CRUD endpoints:
GET /cafes?location=<location> → List cafés (filter by location, sorted by employee count).
GET /employees?cafe=<cafe> → List employees (filter by café, sorted by days worked).
POST /cafe → Add new café.
PUT /cafe → Update existing café.
DELETE /cafe → Delete café (and employees under it).
POST /employee → Add new employee & assign to café.
PUT /employee → Update employee & café assignment.
DELETE /employee → Remove employee.
Employee ID auto-generated in format UIXXXXXXX.
Validation for phone numbers, emails, and unique café/employee constraints.
Relationship rules: one employee can only belong to one café.

Frontend
Cafes Page
Table with Logo, Name, Description, Employees, Location.
Filter cafés by location.
Add, edit, and delete cafés.
Clicking Employees navigates to Employee Page.

Employees Page
Table with ID, Name, Email, Phone, Days Worked, Café.
Add, edit, and delete employees.
Assign employee to café via dropdown.

Forms
Add/Edit Café: validations on name, description, logo, location.
Add/Edit Employee: validations on name, email, phone (SG format), gender, café assignment.
Unsaved changes warning before navigation.


Backend Setup
cd backend-mysql
npm install
npm run seed
nodemon index.js

Frontend Setup
cd frontend-react
npm install
npm run dev

API examples
get /cafes
get /cafes?location=woodlands
get /cafes/:id
post /cafes
put /cafes
delete /cafes/:id
get /employees
get /employees?cafe=starbucks
get /employees/:id
post /employees
put /employees
delete /employees/:id


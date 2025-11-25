**📋 Task Manager Application**
A full-featured task management application built with React, Vite, and Tailwind CSS. This application demonstrates modern React development practices including hooks, component architecture, state management, and session handling.

--
**🚀 Live Demo**
nelo-task-manager.netlify.app

--

**✨ Features**
**🔐 Authentication**

Login System with email/password
Session Management using sessionStorage
Secure logout functionality
Session persists until browser tab closes

--

**📝 Task Management (CRUD Operations)**

✅ Create tasks with title, description, priority, and due date
✅ Read and display all tasks with detailed information
✅ Update tasks with inline editing
✅ Delete tasks with confirmation dialog
✅ Toggle task status (Complete/Pending)
✅ Form Validation for required fields

--

**🔍 Search & Filter**

Elastic Search with case-insensitive partial matching
Debounced Search (500ms delay) to optimize performance
Multiple Filters:

All Tasks
Completed Tasks
Pending Tasks
Priority Levels (High, Medium, Low)

--



**📊 Dashboard Features**

Real-time task statistics
Task count by status
Visual priority badges
Responsive layout

--

**📧 Task Automation**

Automated Email Notifications (Simulated Cron Job)
Checks pending tasks every 20 minutes
Logs mock email notifications to console
Production-ready architecture for real email integration

--

**💾 Data Persistence**

Tasks stored in sessionStorage
Data persists across page refreshes
Cleared on logout for security

--


**🛠️ Tech Stack**

Frontend Framework: React 18
Build Tool: Vite
Styling: Tailwind CSS
Icons: Lucide React
State Management: React Hooks (useState, useEffect)
Storage: Browser SessionStorage


--

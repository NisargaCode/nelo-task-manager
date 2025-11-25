import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { LoginScreen } from './components/LoginScreen';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { useDebounce } from './hooks/useDebounce';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [editTask, setEditTask] = useState(null);

  const debouncedSearch = useDebounce(searchQuery, 500);

  // Check login status and load tasks
  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    const savedTasks = sessionStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to session storage
  useEffect(() => {
    if (tasks.length > 0) {
      sessionStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Email automation - check every 20 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      checkPendingTasks();
    }, 20 * 60 * 1000); // 20 minutes

    return () => clearInterval(interval);
  }, [tasks]);

  const checkPendingTasks = () => {
    const pendingTasks = tasks.filter(task => !task.completed);
    if (pendingTasks.length > 0) {
      console.log('===== MOCK EMAIL NOTIFICATION =====');
      console.log(`Time: ${new Date().toLocaleString()}`);
      console.log(`Pending Tasks Count: ${pendingTasks.length}`);
      pendingTasks.forEach(task => {
        console.log(`- ${task.title} (Due: ${task.dueDate}, Priority: ${task.priority})`);
      });
      console.log('===================================');
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('tasks');
    setIsLoggedIn(false);
    setTasks([]);
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setEditTask(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Filter tasks based on search and filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed' && !task.completed) return false;
    if (filter === 'pending' && task.completed) return false;
    if (filter === 'high' && task.priority !== 'high') return false;
    if (filter === 'medium' && task.priority !== 'medium') return false;
    if (filter === 'low' && task.priority !== 'low') return false;

    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.priority.toLowerCase().includes(query)
      );
    }

    return true;
  });

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const userEmail = sessionStorage.getItem('userEmail');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Task Manager Dashboard</h1>
            <p className="text-sm text-gray-600">Welcome, {userEmail}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-1">
            <TaskForm
              onAddTask={addTask}
              editTask={editTask}
              onUpdateTask={updateTask}
              onCancelEdit={() => setEditTask(null)}
            />
          </div>

          {/* Right Column - Tasks List */}
          <TaskList
            tasks={filteredTasks}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filter={filter}
            setFilter={setFilter}
            onEdit={setEditTask}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
          />
        </div>
      </div>
    </div>
  );
}
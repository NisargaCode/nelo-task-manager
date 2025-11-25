import React, { useState } from 'react';
import { Edit2, Trash2, Check, X } from 'lucide-react';

export const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  const handleDelete = () => {
    onDelete(task.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${
      task.completed ? 'border-green-500 bg-gray-50' : 'border-blue-500'
    }`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {task.title}
          </h3>
          <p className={`text-sm mt-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
            {task.description}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`p-2 rounded-lg transition ${
              task.completed ? 'bg-gray-200 text-gray-600' : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
            title={task.completed ? 'Mark as pending' : 'Mark as complete'}
          >
            {task.completed ? <X size={18} /> : <Check size={18} />}
          </button>
          <button
            onClick={() => onEdit(task)}
            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
            title="Edit task"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
            title="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority.toUpperCase()}
        </span>
        <span className="text-sm text-gray-600">Due: {task.dueDate}</span>
        <span className={`text-sm font-medium ${task.completed ? 'text-green-600' : 'text-orange-600'}`}>
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>

      {showDeleteConfirm && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800 mb-2">Are you sure you want to delete this task?</p>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
            >
              Delete
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
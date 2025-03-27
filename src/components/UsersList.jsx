import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Trash2, Edit, LogOut } from 'lucide-react';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/');
      return;
    }

    // Prevent duplicate toasts
    if (isFirstRender.current) {
      toast.success('Welcome to User Management', {
        duration: 2000,
      });
      isFirstRender.current = false;
    }

    fetchUsers(page);
  }, [page, navigate]);

  const fetchUsers = async (currentPage) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${currentPage}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      toast.error('Failed to fetch users. Please try again.', {
        duration: 3000,
      });
    }
  };

  const handleDelete = async (userId) => {
    // Show confirmation toast
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    
    if (confirmDelete) {
      try {
        await axios.delete(`https://reqres.in/api/users/${userId}`);
        
        // Update users list
        setUsers(users.filter(user => user.id !== userId));
        
        // Show success toast
        toast.success('User deleted successfully', {
          duration: 2000,
        });
      } catch (error) {
        // Show error toast
        toast.error('Failed to delete user. Please try again.', {
          duration: 3000,
        });
      }
    }
  };

  const handleEdit = (user) => {
    navigate(`/edit/${user.id}`, { state: { user } });
  };

  const handleLogout = () => {
    // Show logout toast
    toast.success('Logged out successfully', {
      duration: 2000,
    });

    // Clear token and navigate
    localStorage.removeItem('userToken');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 sm:mb-0 text-center w-full sm:w-auto">
            User Management
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 w-full sm:w-auto justify-center"
          >
            <LogOut className="mr-2 w-5 h-5" /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <div 
              key={user.id} 
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
            >
              <div className="p-5 flex flex-col items-center">
                <div className="relative mb-4">
                  <img 
                    src={user.avatar} 
                    alt={`${user.first_name} ${user.last_name}`} 
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                  <div className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-sm sm:text-base">
                    {user.id}
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2 text-center">
                  {`${user.first_name} ${user.last_name}`}
                </h2>
                <p className="text-gray-500 mb-4 text-xs sm:text-sm text-center">
                  {user.email}
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full flex items-center justify-center hover:scale-110 transition-transform w-full"
                  >
                    <Edit className="mr-2 w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full flex items-center justify-center hover:scale-110 transition-transform w-full"
                  >
                    <Trash2 className="mr-2 w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center space-x-2 space-y-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`px-4 py-2 rounded-full shadow-md transition-all duration-300 m-1 ${
                page === pageNum 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-110' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
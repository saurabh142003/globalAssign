import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Edit, User, Mail, X, Save, Upload } from 'lucide-react';

const EditUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state || {};

  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await axios.put(`https://reqres.in/api/users/${user.id}`, {
        first_name: firstName,
        last_name: lastName,
        email,
        avatar
      });
      
      toast.success('User updated successfully', {
        duration: 2000,
        position: 'top-right',
      });

      navigate('/users');
    } catch (err) {
      toast.error('Failed to update user. Please try again.', {
        duration: 3000,
        position: 'top-right',
      });
      setError('Failed to update user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    toast.dismiss();
    navigate('/users');
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 grid place-items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
        <div className="relative bg-blue-600 p-6 text-center">
          <div className="absolute top-4 right-4">
            <button 
              onClick={handleCancel}
              className="text-white hover:bg-blue-700 p-2 rounded-full transition duration-300"
            >
              <X size={24} />
            </button>
          </div>
          <div className="inline-block mb-4 relative">
            <img 
              src={avatar || `https://ui-avatars.com/api/?name=${firstName}+${lastName}`} 
              alt="User Avatar" 
              className="w-32 h-32 rounded-full object-cover border-4 border-white mx-auto shadow-lg"
            />
            <button 
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
            >
              <Upload size={20} />
            </button>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleAvatarUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
          <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-gray-700 mb-2 inline-flex items-center">
                <User className="mr-2 text-blue-500" size={20} />
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label className="text-gray-700 mb-2 inline-flex items-center">
                <User className="mr-2 text-blue-500" size={20} />
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
                placeholder="Enter last name"
              />
            </div>

            <div>
              <label className="text-gray-700 mb-2 inline-flex items-center">
                <Mail className="mr-2 text-blue-500" size={20} />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full inline-flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition duration-300 
                ${isLoading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2" size={20} />
                  Update User
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full inline-flex justify-center items-center py-3 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition duration-300"
            >
              <X className="mr-2" size={20} />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
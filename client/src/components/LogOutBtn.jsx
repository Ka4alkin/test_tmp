import React from 'react';

const LogOutBtn = ({handleLogout}) => {
  return (
    <div>
      <button
        className="py-2 px-3 bg-gray-400 hover:bg-gray-500 text-white rounded-md focus:ring focus:ring-gray-200"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default LogOutBtn;

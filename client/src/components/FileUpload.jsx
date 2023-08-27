import React, {useState} from 'react';
import axiosInstance from '../axiosInstance.js';
import {alertErr, alertSuccess} from '../utils.js';
import {fetchMovies} from '../store/actions/movieActions.js';
import {useDispatch} from 'react-redux';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append(`file`, selectedFile);

      await axiosInstance.post('/movies/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
          .then((response) => {
            alertSuccess(`Import successfully ${JSON.stringify(response.data)}`);
          })
          .then(()=>{
            dispatch(fetchMovies( '0'));
          })
          .catch((error) => {
            alertErr(error);
          });
    }
  };

  return (
    <div className="my-4">
      <input type="file" accept=".txt" onChange={handleFileChange} />
      <button
        className="py-2 px-3 bg-gray-400 hover:bg-gray-500 text-white rounded-md focus:ring focus:ring-gray-200"
        onClick={handleUpload}
      >
        Import movies!
      </button>
    </div>
  );
};

export default FileUpload;

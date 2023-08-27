import React, {useState} from 'react';
import axiosInstance from '../axiosInstance.js';
import {alertErr, alertSuccess} from '../utils.js';
import {fetchMovies} from '../store/actions/movieActions.js';
import {useDispatch} from 'react-redux';
import Btn from './Btn.jsx';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const _handleFileChange = (event) => {
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
      <input type="file" accept=".txt" onChange={_handleFileChange} />
      <Btn content={'Import movies!'} handler={handleUpload}/>
    </div>
  );
};

export default FileUpload;

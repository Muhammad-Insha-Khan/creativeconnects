import React, { useState } from 'react';
import '../styles/ImageUploader.css';

const ImageUploader = ({ heading, placeholder }) => {
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files); // Get all selected files
    const previewUrls = files.map((file) => URL.createObjectURL(file)); // Generate preview URLs
    setImagePreviews(previewUrls); // Update state with previews
  };

  return (
    <div className="image-uploader-container">
      <div className="uploader-header">
        <h2 className="uploader-heading">{heading}</h2>
        <input 
          type="file" 
          accept="image/*" 
          multiple 
          onChange={handleImageChange} 
          className="file-input"
          placeholder={placeholder}
        />
      </div>
      {imagePreviews.length > 0 && (
        <div className="image-preview">
          <h3>Preview:</h3>
          <div className="preview-images">
            {imagePreviews.map((preview, index) => (
              <img 
                key={index} 
                src={preview} 
                alt={`Preview ${index + 1}`} 
                className="preview-image" 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

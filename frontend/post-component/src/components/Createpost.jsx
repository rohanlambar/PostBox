import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import profilePic from "../assets/sign.jpg";

const CreatePost = ({ username }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Show image preview
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      alert("Please select an image!");
      return;
    }

    setLoading(true);
    
    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    try {
      const response = await fetch("http://localhost:8000/post", {
        method: "POST",
        body: formData,
      });
      console.log(response)
      const result = await response.json();
      console.log(result)
      if (response.ok) {
        alert("Post created successfully!");
        setDescription(""); // Clear input field
        setImage(null);
        setPreview(null);
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-w-md max-w-[50%] mx-auto bg-white rounded-lg shadow-md overflow-hidden my-4">
      <div className="max-w-[90%] mx-auto my-2">
        
        {/* Header */}
        <div className="flex items-center p-4 border-b">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={profilePic}
            alt={`${username}'s profile`}
          />
          <div className="ml-3 font-semibold text-sm">{username}</div>
          <div className="ml-auto text-gray-500 cursor-pointer">•••</div>
        </div>

        {/* Upload Image */}
        <form onSubmit={handleSubmit}>
          <div
            className="flex flex-col bg-slate-200 p-2 w-full min-h-[300px] place-content-center justify-center items-center cursor-pointer"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            {preview ? (
              <img
                src={preview}
                alt="Selected"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <>
                <FaCloudUploadAlt className="p-1 text-[50px] border text-black rounded-full place-content-center" />
                <p>Upload image</p>
              </>
            )}
          </div>

          {/* Caption Input */}
          <div className="flex flex-col gap-2 mt-2">
            <input
              type="text"
              className="flex-1 rounded-md text-slate-600 p-2 border border-slate-500"
              placeholder="Enter your caption"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-400 text-white outline-none p-2 rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

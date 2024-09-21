/* eslint-disable react/prop-types */
import { useState } from "react";
import Instance from "./Instance";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const quillModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "align",
  "link",
  "image",
];

const EditBlog = ({ blog, setEditing, setBlogs }) => {
  const [formData, setFormData] = useState({
    id: blog.id,
    title: blog.blog_title,
    author: blog.blog_author,
    body: blog.blog_body,
    image: blog.blog_image,
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuillChange = (content) => {
    setFormData((prev) => ({ ...prev, body: content }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file })); // Store the file itself
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("id", formData.id);
      data.append("title", formData.title);
      data.append("author", formData.author);
      data.append("body", formData.body);
      data.append("image", formData.image); 

      const response = await Instance.post(`/admin/updateBlog`, data, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      if (response.data && response.data.blog) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === blog.id ? response.data.blog : b))
        );
        setEditing(false);
        window.location.reload();
      }
    } catch (err) {
      console.error("Failed to update blog:", err);
      setError("Failed to update blog");
    }
  };

  return (
    <form onSubmit={handleUpdate} className="mt-6 bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold">Edit Blog</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Title */}
      <div className="mb-4">
        <label className="block mb-1">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      {/* Author */}
      <div className="mb-4">
        <label className="block mb-1">Author:</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      {/* Body (ReactQuill) */}
      <div className="mb-4">
        <label className="block mb-1">Body:</label>
        <ReactQuill
          value={formData.body}
          onChange={handleQuillChange}
          modules={quillModules}
          formats={quillFormats}
          className="bg-white"
          required
        />
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block mb-1">Image Upload:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border rounded p-2"
        />
        {formData.image && (
          <img
            src={formData.image}
            alt={formData.title}
            className="mt-4 max-w-full rounded"
          />
        )}
      </div>

      {/* Submit and Cancel */}
      <div>
        <button
          type="submit"
          className="text-white bg-blue-500 rounded px-4 py-2"
        >
          Update Blog
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="ml-4 text-red-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditBlog;

import { useState } from "react";

const CourseModal = ({ isOpen, onClose, onSave }) => {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    instructor: "",
    price: "",
    category: "Programming",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(courseData); // Pass data to parent component
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Create New Course</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={courseData.title}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Course Description"
            value={courseData.description}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="instructor"
            placeholder="Instructor Name"
            value={courseData.instructor}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price in ₹"
            value={course

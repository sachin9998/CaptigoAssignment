import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { BASE_URL, handleSuccess } from "../utils/helper";
const CourseModal = ({ isOpen, onClose, userId, fetchAllCourses }) => {
  // const instructor = user?._id;

  const [courseData, setCourseData] = useState({
    title: "",
    code: "",
    description: "",
    instructor: userId,
    category: "",
    price: "",
  });
  const [error, setError] = useState("");

  const categories = [
    "Programming",
    "Design",
    "Marketing",
    "Business",
    "Other",
  ];

  // Handle Input Changes
  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  // console.log(courseData);

  // Handle Form Submission
  const createNewCourse = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !courseData.title ||
      !courseData.code ||
      !courseData.description ||
      !courseData.instructor ||
      !courseData.price ||
      !courseData.category
    ) {
      setError("All fields are required!");
      return;
    }

    try {
      const url = `${BASE_URL}/course/createCourse`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add "Bearer"
      };

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(courseData),
      });

      const data = await response.json();

      if (data.success) {
        fetchAllCourses();
        handleSuccess("Course created successfully!");
        onClose(); // Close modal after success
      } else {
        handleSuccess(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create course");
    }
  };

  const handleClose = (e) => {
    if (e.target.classList.contains("backdrop-blur")) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 flex items-center justify-center backdrop-blur"
    >
      <div className="bg-white rounded-lg py-10 px-10 w-[500px] box-shadow relative">
        <div className="absolute top-5 right-5">
          <MdOutlineClose
            className="hover:cursor-pointer"
            onClick={onClose}
            size={25}
          />
        </div>

        <form onSubmit={createNewCourse}>
          <h4 className="text-3xl font-semibold mb-7">Create New Course</h4>

          <input
            type="text"
            placeholder="Enter Course Title"
            className="input-box"
            name="title"
            value={courseData.title}
            onChange={handleChange}
          />

          <input
            type="number"
            name="code"
            placeholder="Set Course Code"
            className="input-box"
            min={1}
            max={99999}
            value={courseData.code}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Enter Course Description"
            className="input-box"
            rows="3"
            value={courseData.description}
            onChange={handleChange}
          ></textarea>

          <input
            type="number"
            placeholder="Set Course Price in ₹"
            className="input-box :"
            name="price"
            value={courseData.price}
            onChange={handleChange}
          />

          <div className="input-box">
            <select
              name="category"
              value={courseData.category || ""}
              onChange={handleChange}
              className="w-full"
              required
            >
              <option value="">Select Course Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

          <button type="submit" className="btn-primary uppercase font-semibold">
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;

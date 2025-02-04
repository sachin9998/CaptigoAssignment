import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { BASE_URL, handleSuccess } from "../utils/helper";

const SearchModal = ({ isOpen, onClose }) => {
  const [courseCode, setCourseCode] = useState(null);
  const [error, setError] = useState("");
  const [currentCourse, setCurrentCourse] = useState(null);

  const handleClose = (e) => {
    if (e.target.classList.contains("backdrop-blur")) {
      onClose();
    }
  };

  const findCourseDetailsByCode = async (e) => {
    e.preventDefault();

    if (!courseCode || isNaN(courseCode)) {
      setError("Please enter a valid numeric course code");
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/course/findCourse/${courseCode}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        setCurrentCourse(result.data);
        setError("");
        setCourseCode(null);
        handleSuccess("Course found successfully!");
      } else {
        setCurrentCourse(null);
        setError(result.message || "Course not found");
      }
    } catch (error) {
      setError("Failed to fetch course details");
      console.error("Error fetching course:", error);
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

        <h4 className="text-2xl font-semibold mb-7">
          Find Course Details by CODE
        </h4>

        <input
          type="number"
          name="code"
          placeholder="Set Course Code"
          className="input-box"
          min={1}
          max={99999}
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

        <button
          onClick={findCourseDetailsByCode}
          className="btn-primary uppercase font-semibold"
        >
          Find Course Details
        </button>

        {currentCourse && (
          <div className="mt-6 space-y-3 box-shadow p-5">
            <h3 className="text-xl font-semibold">{currentCourse.title}</h3>
            <div className="space-y-2">
              <p>
                <strong>Code:</strong> {currentCourse.code}
              </p>
              <p>
                <strong>Instructor:</strong> {currentCourse.instructor?.name}
              </p>
              <p>
                <strong>Description:</strong> {currentCourse.description}
              </p>
              <p>
                <strong>Price:</strong> ₹{currentCourse.price}
              </p>
              <p>
                <strong>Enrolled Students:</strong>{" "}
                {currentCourse.studentsEnrolled?.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;

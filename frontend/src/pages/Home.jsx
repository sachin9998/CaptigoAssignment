import { useEffect, useState } from "react";
import Card from "../components/Card/Card.jsx";
import CourseModal from "../components/CourseModal";
import Navbar from "../components/Navbar";
import SearchModal from "../components/SearchModal.jsx";
import { BASE_URL, handleError, handleSuccess } from "../utils/helper.js";

const Home = () => {
  // Finding userId
  const userId = JSON.parse(localStorage.getItem("loggedInUser"))?._id;

  //All Courses
  const [courses, setCourses] = useState([]);

  // User info without password
  const [user, setUser] = useState({}); // Changed to object

  // Set Display Courses
  const [displayedCourses, setDisplayedCourses] = useState([]);

  // Set viewMode
  const [viewMode, setViewMode] = useState("allCourses");

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    if (viewMode === "enrolledCourses") {
      const enrolledCourses = courses.filter((course) =>
        user.enrollCourses?.includes(course._id)
      );
      setDisplayedCourses(enrolledCourses);
    } else {
      setDisplayedCourses(courses);
    }
  }, [viewMode, courses, user.enrollCourses]); // Correct dependencies

  const fetchUserDetails = async (userId) => {
    try {
      if (!userId) return;
      const response = await fetch(`${BASE_URL}/auth/userDetails/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (result.success) setUser(result.data);
    } catch (error) {
      handleError("Error fetching user details");
    }
  };

  const fetchAllCourses = async () => {
    try {
      const response = await fetch(`${BASE_URL}/course/allCourses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (result.success) setCourses(result.data);
    } catch (error) {
      handleError("Error fetching courses");
    }
  };

  const enrollCourse = async (courseId) => {
    try {
      const response = await fetch(`${BASE_URL}/course/enrollCourse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          studentId: user._id,
          courseId: courseId,
        }),
      });
      const result = await response.json();
      if (result.success) {
        await fetchAllCourses();
        await fetchUserDetails(userId); // Refresh user data
        handleSuccess("Enrolled successfully!");
      }
    } catch (error) {
      handleError("Enrollment failed");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserDetails(userId);
      fetchAllCourses();
    }
  }, [userId]);

  return (
    <div className="w-screen">
      <Navbar />
      <div className="flex px-8 gap-3">
        {/* Sidebar */}
        <div className="w-[200px] border-r-[1px] border-slate-300 py-4 h-[calc(100vh-70px)]">
          <div className="px-3 space-y-3">
            <button
              className="btn-primary"
              onClick={() => setViewMode("allCourses")}
            >
              All Courses
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary"
            >
              Create Course
            </button>
            <button
              className="btn-primary"
              onClick={() => setViewMode("enrolledCourses")}
            >
              Enrolled Courses
            </button>

            <button
              className="btn-primary"
              onClick={() => setIsSearchModalOpen(true)}
            >
              Find Course Details
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="px-4 pt-4">
            <p className="text-lg">👋 Hello, {user?.name}!</p>
          </div>
          <div className="py-2 px-4">
            <h2 className="text-xl mb-3">
              {viewMode === "enrolledCourses"
                ? "Your Enrolled Courses"
                : "All Courses List"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedCourses.length > 0 ? (
                displayedCourses.map((course) => (
                  <Card
                    key={course._id}
                    course={course}
                    user={user}
                    enrollCourse={enrollCourse}
                  />
                ))
              ) : (
                <div className="text-3xl">No Courses Found!</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fetchAllCourses={fetchAllCourses}
        userId={userId}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </div>
  );
};

export default Home;

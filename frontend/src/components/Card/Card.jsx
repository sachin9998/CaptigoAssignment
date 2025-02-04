import React, { useEffect, useState } from "react";

const Card = ({ course, user, enrollCourse }) => {
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (course.studentsEnrolled?.some((student) => student._id === user._id)) {
      setIsEnrolled(true);
    }
  }, [course.studentsEnrolled, user._id]);

  // useEffect(() => {
  //   // Check if the user is already enrolled in the course
  //   if (course.studentsEnrolled?.includes(user._id)) {
  //     setIsEnrolled(true);
  //   }
  // }, [course.studentsEnrolled, user._id]);

  return (
    <div className="rounded box-shadow px-5 py-3 flex flex-col gap-2 justify-between">
      <div className="flex justify-between items-center font-semibold">
        <p className="text-sm">Instructor: {course.instructor.name}</p>
        <p className="text-sm">Course Code: {course.code}</p>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{course.title}</h3>

        <p className="text-xs bg-green-600 text-white rounded-full p-1 px-4">
          <span className="font-semibold">
            {course?.studentsEnrolled?.length}+
          </span>{" "}
          Enrolled
        </p>
      </div>
      <p className="text-sm text-justify">{course.description}</p>

      <div className="flex justify-between items-center text-sm">
        <p>Price: ₹{course.price}</p>
        <p>Category: {course.category}</p>
      </div>

      <div>
        {isEnrolled ? (
          <button
            className="hover:cursor-not-allowed btn-primary bg-white border-blue-500 text-blue-500 p-1 text-sm"
            disabled
          >
            Already Enrolled
          </button>
        ) : (
          <button
            onClick={() => enrollCourse(course._id)} // Trigger enrollment
            className="btn-primary p-1 text-sm"
          >
            Enroll Now
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;

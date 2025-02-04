import Course from "../Models/Course.js";
import { User } from "../models/User.js";

export const createCourse = async (req, res) => {
  try {
    const { title, code, description, instructor, category, price } = req.body;

    // Validate required fields
    if (!title || !code || !description || !instructor || !category || !price) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if the instructor exists
    const instructorExists = await User.findById(instructor);
    if (!instructorExists) {
      return res
        .status(404)
        .json({ success: false, message: "Instructor not found" });
    }

    // Check if a course with the same code already exists
    const existingCourse = await Course.findOne({ code });
    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: "Course with this code already exists",
      });
    }

    // Create new course
    const newCourse = new Course({
      title,
      code,
      description,
      instructor,
      category,
      price,
    });

    // Save course to the database
    await newCourse.save();

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const fetchAllCourses = async (req, res) => {
  try {
    // Retrieve all courses and populate the instructor and enrolled students
    const courses = await Course.find()
      .populate("instructor", "name email") // Fetch instructor's name & email
      .populate("studentsEnrolled", "name email"); // Fetch enrolled students' names & emails

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};

// Enroll a student in a course
export const enrollCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    // Validate required fields
    if (!studentId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Student ID and Course ID are required",
      });
    }

    // Find the course
    const course = await Course.findById(courseId);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    // Find the student (optional, if you want to check if student exists)
    const student = await User.findById(studentId);

    console.log("STudent", student);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // Check if the student is already enrolled
    if (course.studentsEnrolled.includes(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Student is already enrolled in this course",
      });
    }

    // Add student to course
    course.studentsEnrolled.push(studentId);

    // Add course to student's enrolled courses
    student.enrollCourses.push(courseId);

    await course.save();
    await student.save();

    res.status(200).json({
      success: true,
      message: "Student enrolled successfully",
      course: course,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get course details by course code
export const getCourseDetailsByCode = async (req, res) => {
  try {
    const { code } = req.params; // Changed from courseCode to code
    console.log("Requested Course Code:", code);

    // Find the course by code
    const course = await Course.findOne({ code: code })
      .populate("instructor", "name email") // Populate instructor info
      .populate("studentsEnrolled", "name email"); // Populate enrolled students' info

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch course details",
      error: error.message,
    });
  }
};

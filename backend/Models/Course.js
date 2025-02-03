import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    code: {
      type: Number,
      required: [true, "Course Code is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
      trim: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: [true, "Instructor is required"],
    },
    category: {
      type: String,
      enum: ["Programming", "Design", "Marketing", "Business", "Other"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to users who enrolled
      },
    ],
  },
  { timestamps: true }
);

// Exporting the Course model
const Course = mongoose.model("Course", courseSchema);
export default Course;

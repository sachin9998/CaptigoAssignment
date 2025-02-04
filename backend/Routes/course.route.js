import { Router } from "express";
import {
  createCourse,
  enrollCourse,
  fetchAllCourses,
  getCourseDetailsByCode,
} from "../Controllers/course.controller.js";
import { verifyJWT } from "../Middleware/Auth.js";
const router = Router();

router.post("/createCourse", verifyJWT, createCourse);
router.get("/allCourses", verifyJWT, fetchAllCourses);
router.get("/findCourse/:code", verifyJWT, getCourseDetailsByCode);

router.post("/enrollCourse", verifyJWT, enrollCourse);

export default router;

import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const course = {
  title: "Learn JavaScript",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dignissimos maxime ut quas soluta quam fugiat cum esse molestias tempore.",
};

const Home = () => {
  const navigate = useNavigate();

  // Retrieve user data from localStorage and parse it
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  console.log(user);

  return (
    <div className="w-screen">
      <Navbar />
      <div className="flex px-8 py-5 gap-5">
        <div className="w-[200px] py-4 box-shadow rounded-md h-[85vh]">
          {/* <div>
            <p className="text-2xl text-center"></p>
          </div> */}

          <div className="px-3">
            <button className="btn-primary">All Courses</button>
          </div>

          <div className="px-3">
            <button className="btn-primary">Create Course</button>
          </div>

          <div className="px-3">
            <button className="btn-primary">Enrolled Courses</button>
          </div>

          <div className="px-3">
            <button className="btn-primary">Course Details</button>
          </div>
        </div>

        {/* Right Side Section */}
        <div className="box-shadow rounded-md flex-1">
          <div className="pt-4 px-4">
            <p className="text-lg">👋 Hello, User!</p>
          </div>

          <div className="py-2 px-4">
            <div className="mb-3">
              <h2 className="text-xl">All Courses List:</h2>
            </div>

            <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {/* Cards */}
              <div className="rounded box-shadow px-5 py-3 flex flex-col gap-2">
                <div className="flex justify-between items-center font-semibold">
                  <p className="text-sm">Instructor: Sachin Alam</p>
                  <p className="text-sm">Course Code: 294</p>
                </div>

                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{course.title}</h3>

                  <p className="text-xs bg-green-600 text-white rounded-full p-1 px-4">
                    <span className="font-semibold">31+</span> Enrolled
                  </p>
                </div>
                <p className="text-sm text-justify">{course.description}</p>

                <div className="flex justify-between items-center text-sm">
                  <p>Price: ₹200</p>
                  <p>Category: Programming</p>
                </div>

                <div>
                  <button className="btn-primary p-1 text-sm font-bold">
                    Enroll Now
                  </button>
                  {/* <button className="text-sm bg-blue-500 text-white rounded-full p-1 px-4 font-semibold">
                    Enroll Now
                  </button> */}
                </div>
              </div>
              <div className="rounded box-shadow px-5 py-3 flex flex-col gap-2">
                <div className="flex justify-between items-center font-semibold">
                  <p className="text-sm">Instructor: Sachin Alam</p>
                  <p className="text-sm">Course Code: 294</p>
                </div>

                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{course.title}</h3>

                  <p className="text-xs bg-green-600 text-white rounded-full p-1 px-4">
                    <span className="font-semibold">31+</span> Enrolled
                  </p>
                </div>
                <p className="text-sm text-justify">{course.description}</p>

                <div className="flex justify-between items-center text-sm">
                  <p>Price: ₹200</p>
                  <p>Category: Programming</p>
                </div>

                <div>
                  <button className="btn-primary p-1 text-sm font-bold">
                    Enroll Now
                  </button>
                  {/* <button className="text-sm bg-blue-500 text-white rounded-full p-1 px-4 font-semibold">
                    Enroll Now
                  </button> */}
                </div>
              </div>
              <div className="rounded box-shadow px-5 py-3 flex flex-col gap-2">
                <div className="flex justify-between items-center font-semibold">
                  <p className="text-sm">Instructor: Sachin Alam</p>
                  <p className="text-sm">Course Code: 294</p>
                </div>

                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{course.title}</h3>

                  <p className="text-xs bg-green-600 text-white rounded-full p-1 px-4">
                    <span className="font-semibold">31+</span> Enrolled
                  </p>
                </div>
                <p className="text-sm text-justify">{course.description}</p>

                <div className="flex justify-between items-center text-sm">
                  <p>Price: ₹200</p>
                  <p>Category: Programming</p>
                </div>

                <div>
                  <button className="btn-primary p-1 text-sm font-bold">
                    Enroll Now
                  </button>
                  {/* <button className="text-sm bg-blue-500 text-white rounded-full p-1 px-4 font-semibold">
                    Enroll Now
                  </button> */}
                </div>
              </div>
              <div className="rounded box-shadow px-5 py-3 flex flex-col gap-2">
                <div className="flex justify-between items-center font-semibold">
                  <p className="text-sm">Instructor: Sachin Alam</p>
                  <p className="text-sm">Course Code: 294</p>
                </div>

                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{course.title}</h3>

                  <p className="text-xs bg-green-600 text-white rounded-full p-1 px-4">
                    <span className="font-semibold">31+</span> Enrolled
                  </p>
                </div>
                <p className="text-sm text-justify">{course.description}</p>

                <div className="flex justify-between items-center text-sm">
                  <p>Price: ₹200</p>
                  <p>Category: Programming</p>
                </div>

                <div>
                  <button className="btn-primary p-1 text-sm font-bold">
                    Enroll Now
                  </button>
                  {/* <button className="text-sm bg-blue-500 text-white rounded-full p-1 px-4 font-semibold">
                    Enroll Now
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

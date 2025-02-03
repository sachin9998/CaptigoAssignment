import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BASE_URL,
  handleError,
  handleSuccess,
  validateEmail,
} from "../utils/helper.js";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    try {
      const url = `${BASE_URL}/auth/signup`;

      const signupData = {
        name,
        email,
        password,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const result = await response.json();
      //   console.log(result);

      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="box-shadow w-96 md:w-[400px] lg:w-[500px] rounded px-8 py-10 bg-white/30">
        <form onSubmit={handleSignup}>
          <h4 className="text-3xl font-semibold mb-7">Sign Up</h4>

          <input
            type="text"
            placeholder="Name"
            className="input-box "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Email"
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="input-box"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

          <button type="submit" className="btn-primary">
            SIGN UP
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-medium text-[#2B85FF] underline hover:cursor-pointer"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

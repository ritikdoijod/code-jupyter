import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Form from "../components/Form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, login } from "../state";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";

const Auth = () => {
  const [form, setForm] = useState("login");
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state);

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const register = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      const loggedIn = await response.json();

      if (loggedIn) {
        dispatch(login({ token: loggedIn.token, user: loggedIn.user }));
        window.location = "/";
      }
    } catch (error) {}
  };

  const auth = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      const loggedIn = await response.json();
      if (loggedIn) {
        dispatch(login({ token: loggedIn.token, user: loggedIn.user }));
        window.location = "/";
      }
    } catch (error) {}
  };

  return (
    <div className="flex h-full w-full flex-col text-theme-700 dark:text-theme-400">
      <Navbar className="flex items-center justify-around">
        <div className="flex items-center gap-20">
          <Navbar.Brand>CodeJupyter</Navbar.Brand>

          <div className="flex items-center gap-10">
            <Navbar.Item onClick={() => navigate("/")}>Home</Navbar.Item>
          </div>
        </div>
        <div className="flex items-center justify-between gap-16 font-bold">
          <Navbar.Item onClick={() => dispatch(setTheme())}>
            {theme === "light" ? (
              <FontAwesomeIcon icon={solid("moon")} />
            ) : (
              <FontAwesomeIcon icon={solid("sun")} />
            )}
          </Navbar.Item>
          <Navbar.Item
            className="cursor-pointer rounded bg-theme-900/10 px-3 py-1 text-theme-700 transition-all hover:bg-accent-500 hover:text-theme-50 dark:bg-theme-50/10 dark:text-theme-200 dark:hover:bg-accent-400 dark:hover:text-theme-900"
            onClick={() => setForm(form === "login" ? "register" : "login")}
          >
            {form === "login" ? "Register" : "Login"}
          </Navbar.Item>
        </div>
      </Navbar>

      <div className="flex-auto">
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col gap-12">
            {form === "login" ? (
              <div className="flex flex-col gap-12">
                <div className="flex items-center justify-center text-theme-700 dark:text-theme-200">
                  <h3 className="text-2xl">
                    Login to{" "}
                    <span className="font-Kaushan_Script font-bold text-theme-900 dark:text-theme-50">
                      CodeJupyter
                    </span>
                  </h3>
                </div>
                <Form>
                  <div className="px-8 py-4 ">
                    <div className="flex flex-col gap-8">
                      <Form.Input
                        type="text"
                        name="username"
                        id="username"
                        value={data.username}
                        onChange={handleChange}
                        placeholder="Username"
                      />
                      <div className="relative overflow-hidden rounded-lg">
                        <Form.Input
                          type={showPass ? "text" : "password"}
                          name="password"
                          id="password"
                          value={data.password}
                          onChange={handleChange}
                          placeholder="Password"
                        />
                        <div className="absolute right-0 top-0 flex h-full items-center bg-theme-900/10 px-3">
                          {showPass ? (
                            <FontAwesomeIcon
                              icon={solid("eye")}
                              onClick={() => setShowPass(!showPass)}
                              className="cursor-pointer"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={solid("eye-slash")}
                              onClick={() => setShowPass(!showPass)}
                              className="cursor-pointer"
                            />
                          )}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="rounded-lg bg-theme-900/10 px-3 py-2 font-bold text-theme-700 transition-colors ease-in-out hover:bg-accent-500 hover:text-theme-50 focus:bg-accent-500 focus:text-theme-50 dark:bg-theme-50/5 dark:text-theme-200 dark:hover:bg-accent-400 dark:hover:text-theme-900 dark:focus:bg-accent-400 dark:focus:text-theme-900"
                        onClick={auth}
                      >
                        Login
                      </button>
                    </div>
                    <div>
                      <p className="mt-2 text-sm text-theme-400 dark:text-theme-600">
                        Don't have an account?
                        <span
                          className="mx-2 cursor-pointer font-bold text-theme-900 hover:text-accent-500 dark:text-theme-50 dark:hover:text-accent-400"
                          onClick={() => setForm("register")}
                        >
                          Register
                        </span>
                      </p>
                    </div>
                  </div>
                </Form>
              </div>
            ) : (
              <div className="flex flex-col gap-12">
                <div className="flex items-center justify-center">
                  <h3 className="text-2xl text-theme-700 dark:text-theme-200">
                    Register to{" "}
                    <span className="font-Kaushan_Script font-bold text-theme-900 dark:text-theme-50">
                      CodeJupyter
                    </span>
                  </h3>
                </div>
                <Form>
                  <div className="px-8 py-4 ">
                    <div className="flex flex-col gap-8">
                      <Form.Input
                        type="text"
                        name="username"
                        id="username"
                        value={data.username}
                        onChange={handleChange}
                        placeholder="Username"
                      />
                      <Form.Input
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        onChange={handleChange}
                        placeholder="Email"
                      />
                      <div className="relative overflow-hidden rounded-lg">
                        <Form.Input
                          type={showPass ? "text" : "password"}
                          name="password"
                          id="password"
                          value={data.password}
                          onChange={handleChange}
                          placeholder="Password"
                        />
                        <div className="absolute right-0 top-0 flex h-full cursor-pointer items-center bg-theme-900/10 px-3">
                          {showPass ? (
                            <FontAwesomeIcon
                              icon={solid("eye")}
                              onClick={() => setShowPass(!showPass)}
                              className="cursor-pointer"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={solid("eye-slash")}
                              onClick={() => setShowPass(!showPass)}
                              className="cursor-pointer"
                            />
                          )}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="rounded-lg bg-theme-900/10 px-3 py-2 font-bold text-theme-700 transition-colors ease-in-out hover:bg-accent-500 hover:text-theme-50 focus:bg-accent-500 focus:text-theme-50 dark:bg-theme-50/5 dark:text-theme-200 dark:hover:bg-accent-400 dark:hover:text-theme-900 dark:focus:bg-accent-400 dark:focus:text-theme-900"
                        onClick={register}
                      >
                        Register
                      </button>
                    </div>
                    <div>
                      <p className="mt-2 text-sm text-theme-400 dark:text-theme-600">
                        Already have an account?
                        <span
                          className="mx-2 cursor-pointer font-bold text-theme-900 hover:text-accent-500 dark:text-theme-50 dark:hover:text-accent-400"
                          onClick={() => setForm("login")}
                        >
                          Login
                        </span>
                      </p>
                    </div>
                  </div>
                </Form>
              </div>
            )}
            <div className="mt-12 flex items-center justify-center gap-4 text-center text-sm">
              <Link
                to="/terms"
                className="cursor-pointer text-theme-400 hover:text-accent-500 dark:text-theme-600 dark:hover:text-accent-400"
              >
                Terms
              </Link>
              <Link
                to="#"
                className="cursor-pointer text-theme-400 hover:text-accent-500 dark:text-theme-600 dark:hover:text-accent-400"
              >
                Privacy
              </Link>
              <Link
                to="#"
                className="cursor-pointer text-theme-400 hover:text-accent-500 dark:text-theme-600 dark:hover:text-accent-400"
              >
                Security
              </Link>
              <Link
                to="#"
                className="cursor-pointer text-theme-400 hover:text-accent-500 dark:text-theme-600 dark:hover:text-accent-400"
              >
                Contact US
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer>
        <span className="px-3">
          <FontAwesomeIcon
            icon={regular("copyright")}
            className="flex items-center"
          />
        </span>
        Copyright {new Date().getFullYear()} | All rights reserved.
      </Footer>
    </div>
  );
};

export default Auth;

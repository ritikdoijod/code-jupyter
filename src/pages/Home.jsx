import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

import jupyter_svg from "../assets/jupyter.svg";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout, setTheme } from "../state";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, token, user } = useSelector((state) => state);

  return (
    <div className="flex h-full w-full flex-col text-theme-700 dark:text-theme-400">
      <Navbar className="flex items-center justify-around">
        <div className="flex items-center gap-20">
          <Navbar.Brand>CodeJupyter</Navbar.Brand>

          <div className="flex items-center gap-10">
            <Navbar.Item onClick={() => navigate("/editor")}>
              EDITOR
            </Navbar.Item>
            <Navbar.Item onClick={() => navigate("/features")}>
              FEATURES
            </Navbar.Item>
            <Navbar.Item onClick={() => navigate("/about")}>
              ABOUT US
            </Navbar.Item>
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
          {token ? (
            <>
              <Menu as="div" className="relative">
                <Menu.Button className="h-10 w-10 rounded-full bg-theme-900/10 text-lg dark:bg-theme-50/10">
                  <div className="flex h-full w-full items-center justify-center">
                    <FontAwesomeIcon icon={solid("user")} />
                  </div>
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute mt-2 flex flex-col rounded-lg bg-theme-0 dark:bg-theme-950">
                    <Menu.Item className="px-3 py-1">
                      <div>{user.username}</div>
                    </Menu.Item>
                    <Menu.Item className="px-3 py-1">
                      <button
                        className="mx-3 my-1 rounded-md bg-theme-900/10 hover:bg-accent-500 hover:text-theme-0 dark:bg-theme-50/5 dark:hover:bg-accent-400 dark:hover:text-theme-950"
                        onClick={() => dispatch(logout())}
                      >
                        Logout
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </>
          ) : (
            <Navbar.Item
              onClick={() => navigate("/auth")}
              className="cursor-pointer rounded bg-theme-900/10 px-3 py-1 text-theme-700 transition-all hover:bg-accent-500 hover:text-theme-50 dark:bg-theme-50/10 dark:text-theme-200 dark:hover:bg-accent-400 dark:hover:text-theme-900"
            >
              Login
            </Navbar.Item>
          )}
        </div>
      </Navbar>

      <div className="flex-auto">
        <div className="flex h-full w-full items-center">
          <div className="w-[50%] p-24">
            <div className="">
              <h1 className="font-Kaushan_Script bg-gradient-to-r from-theme-700 to-accent-500 bg-clip-text p-4 text-right text-8xl font-bold leading-normal text-transparent dark:from-theme-200 dark:to-accent-400">
                Playground for Programmer
              </h1>
              <p className="font-Great_Vibes my-4 text-right text-3xl font-extrabold text-theme-500">
                Play as you wish...
              </p>
            </div>
            <div className="mt-20 flex items-center justify-end gap-12">
              <div
                onClick={() => navigate("/features")}
                className="cursor-pointer text-theme-500 underline-offset-8 transition-colors ease-in-out hover:text-accent-500 hover:underline dark:hover:text-accent-400"
              >
                Discover Features
              </div>
              <div
                onClick={() =>
                  token ? navigate("/editor") : navigate("/auth")
                }
                className="cursor-pointer rounded-lg border-2 border-accent-500 px-6 py-3 text-xl font-bold transition-colors ease-linear hover:bg-cyan-500 hover:text-theme-50 dark:border-accent-400 dark:hover:bg-cyan-400 dark:hover:text-theme-900"
              >
                Get Started
              </div>
            </div>
          </div>
          <div className="flex flex-auto items-center justify-center">
            <div className="h-[80%] w-[80%]">
              <img
                src={jupyter_svg}
                alt="jupyter_image"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>


      <Footer>
        <div className="flex h-full flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <span className="px-3">
              <FontAwesomeIcon
                icon={regular("copyright")}
                className="flex items-center"
              />
            </span>
            Copyright {new Date().getFullYear()} | All rights reserved.
          </div>
          <div className="flex items-center justify-center gap-4 text-center text-sm">
            <Link
              to="/terms"
              className="cursor-pointer text-theme-400 hover:text-accent-500 dark:text-theme-600 dark:hover:text-accent-400"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="cursor-pointer text-theme-400 hover:text-accent-500 dark:text-theme-600 dark:hover:text-accent-400"
            >
              Privacy
            </Link>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default Home;

import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import lang_img from "../assets/coding-language.png";
import folder_img from "../assets/folder.png";
import syntax_img from "../assets/code.png";
import snippets_img from "../assets/snippets.png";
import bulb_img from "../assets/intellisense.png";

import { setTheme, logout } from "../state";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FeatureCard from "../components/FeatureCard";

const Features = () => {
  const { theme, token, user } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="flex h-full w-full flex-col text-theme-700 dark:text-theme-400">
      <Navbar className="flex items-center justify-around">
        <div className="flex items-center gap-20">
          <Navbar.Brand>CodeJupyter</Navbar.Brand>

          <div className="flex items-center gap-10">
            <Navbar.Item onClick={() => navigate("/")}>HOME</Navbar.Item>
            <Navbar.Item onClick={() => navigate("/editor")}>
              EDITOR
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

      <div className="flex flex-auto flex-col gap-12">
        <div className="mt-12 flex flex-col items-center justify-center">
          <h1 class="text-4xl font-extrabold text-accent-500 dark:text-accent-400">
            FEATURES
          </h1>
          <p className="mt-8">
            Start coding instantly with{" "}
            <span className="font-Kaushan_Script px-1 font-bold text-theme-900 dark:text-theme-50">
              CodeJupyter
            </span>{" "}
            to get all this features.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-3 gap-12">
            <FeatureCard>
              <div className="flex gap-4">
                <FeatureCard.Image
                  image={lang_img}
                  image_text="programming languages"
                />
                <FeatureCard.Header>
                  Multiple Language Support
                </FeatureCard.Header>
              </div>
              <FeatureCard.Body>
                Support multliple language like C, C++, Java, Python, etc.
              </FeatureCard.Body>
            </FeatureCard>
            <FeatureCard>
              <div className="flex gap-4">
                <FeatureCard.Image image={folder_img} image_text="folder" />
                <FeatureCard.Header>File Management</FeatureCard.Header>
              </div>
              <FeatureCard.Body>
                File manager to save your code and access it anytime.
              </FeatureCard.Body>
            </FeatureCard>
            <FeatureCard>
              <div className="flex gap-4">
                <FeatureCard.Image image={syntax_img} image_text="folder" />
                <FeatureCard.Header>Syntax Highlighting</FeatureCard.Header>
              </div>
              <FeatureCard.Body>
                Syntax highlighting determines the color and style of source
                code.
              </FeatureCard.Body>
            </FeatureCard>
            <FeatureCard>
              <div className="flex gap-4">
                <FeatureCard.Image image={snippets_img} image_text="folder" />
                <FeatureCard.Header>Code Snippets</FeatureCard.Header>
              </div>
              <FeatureCard.Body>
                A collection of code snippets for repeating block of codes to
                save your time.
              </FeatureCard.Body>
            </FeatureCard>
            <FeatureCard>
              <div className="flex gap-4">
                <FeatureCard.Image image={bulb_img} image_text="folder" />
                <FeatureCard.Header>Code Intellisense</FeatureCard.Header>
              </div>
              <FeatureCard.Body>
                Intellisense provide various code editing features including
                code completion, parameter info, quick info, and member lists.
              </FeatureCard.Body>
            </FeatureCard>
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
      </Footer>
    </div>
  );
};

export default Features;

import React from "react";
import Navbar from "../components/Navbar";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, logout } from "../state";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import Footer from "../components/Footer";
import MemberCard from "../components/MemberCard";
import { Link } from "react-router-dom";

const About = () => {
  const { theme, token, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const members = [
    {
      title: "Ms",
      name: "Pallavi Bhasme",
      pos: "B.E. Graduate",
      inst: "NIT, Nagpur",
    },
    {
      title: "Mr",
      name: "Ritik Doijod",
      pos: "B.E. Graduate",
      inst: "NIT, Nagpur",
    },
    {
      title: "Ms",
      name: "Priyanka Puriya",
      pos: "B.E. Graduate",
      inst: "NIT, Nagpur",
    },
    {
      title: "Mr",
      name: "Vishal Ikhe",
      pos: "B.E. Graduate",
      inst: "NIT, Nagpur",
    },
  ];
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
            <Navbar.Item onClick={() => navigate("/features")}>
              FEATURES
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

      <div className="w-full flex-auto">
        <div className="mt-12 flex justify-center px-20 py-12">
          <div className="w-4/5">
            <p className="text-justify leading-7">
              Code Jupyter is a free online code execution tool for students and
              developers. A Code Jupyter Team is the sole owner of the
              copyrights and licences for the Code Jupyter project, which was
              originally developed as an academic project. Further adjustments
              may be made and your contributions to the project may be welcomed
              at any time by the Code Jupyter team. Open source contributions
              are welcome to the Code Jupyter project. If you'd want to help
              with the project, kindly get in touch with us. Our services are
              available to you without charge, and everyone can utilise them.
              You are not allowed to abuse the platform, and we forbid you from
              running any dangerous software that might be used to damage us or
              others online.
            </p>
          </div>
        </div>
        <div className="mt-12 w-full">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-center text-2xl font-bold text-accent-500 dark:text-accent-400">
              MEET OUR PROJECT GUIDE
            </h3>
            <div className="mt-4">
              <MemberCard className="w-72">
                <MemberCard.Header>Dr. Mahendra Makeshwar</MemberCard.Header>
                <MemberCard.Line />
                <div className="flex items-center justify-between">
                  <MemberCard.SubHeading>
                    Associate Professor
                  </MemberCard.SubHeading>
                  <MemberCard.Text>NIT, Nagpur</MemberCard.Text>
                </div>
              </MemberCard>
            </div>
          </div>
        </div>
        <div className="mt-20 w-full">
          <div className="flex w-full flex-col items-center justify-center">
            <h3 className="text-2xl font-bold text-accent-500 dark:text-accent-400">
              MEET OUR TEAM
            </h3>
            <div className="mt-4 flex w-full items-center justify-center gap-12">
              {members.map(({ name, pos, inst }) => {
                return (
                  <MemberCard className="w-72">
                    <MemberCard.Header>{name}</MemberCard.Header>
                    <MemberCard.Line />
                    <div className="flex justify-between">
                      <MemberCard.SubHeading>{pos}</MemberCard.SubHeading>
                      <MemberCard.Text>{inst}</MemberCard.Text>
                    </div>
                  </MemberCard>
                );
              })}
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

export default About;

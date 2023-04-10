import React from "react";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../state";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import terms from "../data/terms.json";

const Terms = () => {
  const { theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex h-full w-full flex-col text-theme-700 dark:text-theme-400">
      <Navbar className="flex items-center justify-around">
        <div className="flex items-center gap-20">
          <Navbar.Brand>CodeJupyter</Navbar.Brand>

          <div className="flex items-center gap-10">
            <Navbar.Item onClick={() => navigate("/")}>HOME</Navbar.Item>
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
        </div>
      </Navbar>

      <div className="flex w-full flex-auto flex-col items-center justify-center overflow-hidden">
        <div className="flex h-full w-1/2 flex-col text-justify font-poppins">
          <h1 className="mt-14 mb-8 flex items-center justify-center font-sans text-4xl font-bold text-accent-500">
            TERMS & CONDITIONS
          </h1>

          <div className="mt-4 flex flex-auto flex-col overflow-y-auto text-justify">
            <List>
              {terms.map((term) => {
                return <List.Item>{term}</List.Item>;
              })}
            </List>
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

const List = ({ children }) => {
  return <ul className="flex flex-col gap-4">{children}</ul>;
};

const Item = ({ className, children }) => {
  return (
    <li className="rounded bg-theme-200 px-3 py-2 text-theme-700 dark:bg-theme-700 dark:text-theme-200">
      {children}
    </li>
  );
};

List.Item = Item;
export default Terms;

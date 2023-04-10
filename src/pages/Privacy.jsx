import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTheme } from "../state";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import privacies from "../data/privacies.json";

const Privacy = () => {
  const { theme } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="flex h-full w-full flex-col text-theme-700 dark:text-theme-400">
      <Navbar className="flex items-center justify-around">
        <div className="flex items-center gap-20">
          <Navbar.Brand>CodeJupyter</Navbar.Brand>

          <div className="flex items-center gap-10">
            <Navbar.Item onClick={() => navigate("/")}>
              HOME
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
        </div>
      </Navbar>

      <div className="flex flex-col flex-auto w-full items-center justify-center overflow-hidden">
        <div className="flex w-3/4 h-full flex-col text-justify font-poppins">
          <h1 className="mt-14 mb-8 flex items-center justify-center text-4xl font-bold font-sans text-accent-500">
            PRIVACY POLICY
          </h1>

          <p>
            This privacy policy describes the types of information collected by
            CodeJupyter and how it is used.
          </p>

          <div className="mt-4 flex flex-auto flex-col overflow-y-auto text-justify">
            <List>
              {privacies.map(({ head, text }) => {
                return (
                  <List.Item>
                    <Item.Header>{head}</Item.Header>
                    <Item.Text>{text}</Item.Text>
                  </List.Item>
                );
              })}
            </List>
          </div>
          <div className="mt-4">
            Best Regards,
            <br />
            The CodeJupyter Team
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
  return (
    <ul className="flex flex-col gap-4 dark:text-theme-300">{children}</ul>
  );
};

const Item = ({ children }) => {
  return (
    <li className="rounded-md bg-theme-100 px-3 py-2 dark:bg-theme-800">
      {children}
    </li>
  );
};

const Header = ({ children }) => {
  return <h4 className="text-lg font-bold">{children}</h4>;
};

const Text = ({ children }) => {
  return <p className="mt-2 whitespace-pre-line text-theme-500">{children}</p>;
};

List.Item = Item;
Item.Header = Header;
Item.Text = Text;

export default Privacy;

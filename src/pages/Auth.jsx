import Navbar from "../components/Navbar";
import NavBrand from "../components/Navbar/NavBrand";
import NavItem from "../components/Navbar/NavItem";
import Footer from "../components/Navbar/Footer";
import Form from "../components/Form";

import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../state";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import Input from "../components/Form/Input";

const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme } = useSelector((state) => state);

    return (
        <div className="flex flex-col text-theme-700 w-full h-full">
            <Navbar className="relative flex justify-center items-center">
                <NavBrand>CodeJupyter</NavBrand>

                <NavItem
                    className="absolute right-12"
                    onClick={() => dispatch(setTheme())}
                >
                    {theme === "light" ? (
                        <FontAwesomeIcon icon={solid("moon")} />
                    ) : (
                        <FontAwesomeIcon icon={solid("sun")} />
                    )}
                </NavItem>
            </Navbar>

            <div className="flex-1">
                <div className="flex justify-center items-center w-full h-full">
                    <div className="flex flex-col gap-12">
                        <div className="flex justify-center items-center">
                            <h3 className="text-2xl">
                                Login to{" "}
                                <span className="font-Kaushan_Script text-theme-900 font-bold">
                                    CodeJupyter
                                </span>
                            </h3>
                        </div>
                        <Form>
                            <div className="px-8 py-4 ">
                                <div className="flex flex-col gap-8">
                                    <Input type="text" placeholder="Username" />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                    />
                                    <button
                                        type="submit"
                                        className="px-3 py-2 font-bold text-theme-900 bg-theme-900/5 rounded-lg focus:outline-none focus:bg-accent hover:bg-accent-600"
                                    >
                                        Login
                                    </button>
                                </div>
                                <div>
                                    <p className="mt-2 text-sm text-theme-900/30">
                                        Don't have an account?
                                        <Link to="/register" className="mx-2 font-bold text-theme-900 hover:text-accent">Register</Link>
                                    </p>
                                </div>
                            </div>
                        </Form>
                        <div className="mt-12 flex gap-4 text-sm text-theme-900/20  text-center justify-center items-center">
                            <Link to="#" className="cursor-pointer hover:text-accent">Terms</Link>
                            <Link to="#" className="cursor-pointer hover:text-accent">Privacy</Link>
                            <Link to="#" className="cursor-pointer hover:text-accent">Security</Link>
                            <Link to="#" className="cursor-pointer hover:text-accent">Contact US</Link>
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

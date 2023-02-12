import Navbar from "../components/Navbar";
import NavBrand from "../components/Navbar/NavBrand";
import NavItem from "../components/Navbar/NavItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";

import jupyter_svg from "../assests/jupyter.svg";
import Footer from "../components/Navbar/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout, setTheme } from "../state";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme } = useSelector((state) => state);

    return (
        <div className="bg-theme-100 w-full h-full flex flex-col text-theme-700">
            <Navbar className="flex justify-around items-center">
                <div className="flex items-center gap-20">
                    <NavBrand>CodeJupyter</NavBrand>

                    <div className="flex items-center gap-10">
                        <NavItem onClick={() => navigate("/editor")}>Editor</NavItem>
                        <NavItem>Features</NavItem>
                        <NavItem>Explore</NavItem>
                        <NavItem>About US</NavItem>
                    </div>
                </div>

                <div className="flex w-[10%] gap-6 font-bold items-center">
                    <NavItem onClick={() => dispatch(setTheme())}>
                        {theme === "light" ? (
                            <FontAwesomeIcon icon={solid("moon")} />
                        ) : (
                            <FontAwesomeIcon icon={solid("sun")} />
                        )}
                    </NavItem>
                    <NavItem className="px-3 py-1 transition-all cursor-pointer hover:bg-accent hover:text-theme-100 hover:rounded-full">
                        Register
                    </NavItem>
                    <NavItem
                        onClick={() => navigate("/auth")}
                        className="px-3 py-1 transition-all cursor-pointer text-theme-100 bg-accent rounded-full hover:text-theme-100"
                    >
                        Login
                    </NavItem>
                </div>
            </Navbar>

            <div className="flex flex-1 items-center">
                <div className="w-[50%] p-24">
                    <div className="">
                        <h1 className="p-4 font-Kaushan_Script font-bold text-8xl text-right bg-clip-text text-transparent bg-gradient-to-r from-theme-900/5 to-accent ">
                            Playground for Programmer
                        </h1>
                        <p className="my-4 font-Great_Vibes text-right font-bold text-3xl">
                            Play as you wish...
                        </p>
                    </div>
                    <div className="my-20 flex gap-12 justify-end items-center">
                        <div>Discover Features</div>
                        <div className="px-3 py-1 rounded-lg font-bold text-theme-900 bg-accent cursor-pointer">
                            Get Started
                        </div>
                    </div>
                </div>
                <div className="flex flex-auto h-full justify-center items-center">
                    <div className="w-[80%] h-[80%]">
                        <img
                            src={jupyter_svg}
                            alt="jupyter_image"
                            className="object-cover w-full h-full"
                        />
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

export default Homepage;

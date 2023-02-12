import Navbar from "../components/Navbar";
import NavBrand from "../components/Navbar/NavBrand";
import NavItem from "../components/Navbar/NavItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import AceEditor from "react-ace";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../styles/Editor.css";

import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-min-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-plain_text";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/snippets/c_cpp";
import "ace-builds/src-noconflict/snippets/javascript";

import { setTheme, login } from "../state";
import { useState } from "react";

const Editor = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { theme, token, user } = useSelector((state) => state);
    const [data, setData] = useState({
        lang: "c",
        sourcecode: "",
        input: "",
        output: "",
    });

    const run = async () => {
        try {
            const response = await fetch("http://localhost:8080/compile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    lang: data.lang,
                    sourcecode: data.sourcecode,
                    input: data.input,
                }),
            });

            const resData = await response.json();
            setData({ ...data, output: resData.data });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col w-full h-full text-theme-700">
            <Navbar className="flex justify-around items-center">
                <div className="flex items-center gap-20">
                    <NavBrand>CodeJupyter</NavBrand>

                    <div className="flex items-center gap-10">
                        <NavItem onClick={() => navigate("/")}>Home</NavItem>
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

            <div className="flex flex-1 w-full">
                <div className="flex flex-col h-full w-[18%] px-3 py-1">
                    <div className="flex flex-col">
                        <button
                            className="px-3 py-2 rounded-lg text-theme-900 font-bold bg-theme-900/10"
                        >
                            New +
                        </button>
                    </div>

                    <div className="mt-12 flex flex-col gap-4">
                        {/* {user.dir.folders.map((folder) => {
                            return <div>{folder}</div>;
                        })}
                        {user.dir.files.map((file) => {
                            return <div>{file}</div>;
                        })} */}
                        <div className="px-3 py-2 rounded-lg text-theme-900/70 bg-theme-900/5">
                            File
                        </div>
                        {/* <div className="px-3 py-2 rounded-lg text-theme-900/70 bg-theme-900/5">
                            File
                        </div>
                        <div className="px-3 py-2 rounded-lg text-theme-900/70 bg-theme-900/5">
                            File
                        </div>
                        <div className="px-3 py-2 rounded-lg text-theme-900/70 bg-theme-900/5">
                            File
                        </div> */}
                    </div>
                </div>
                <div className="flex flex-col flex-auto h-full px-3 py-1 gap-2">
                    <div className="w-full h-[70%]">
                        <AceEditor
                            mode="python"
                            theme="xcode"
                            width="100%"
                            height="100%"
                            fontSize="21px"
                            value={data.sourcecode}
                            onChange={(value) =>
                                setData({ ...data, sourcecode: value })
                            }
                            enableBasicAutocompletion={true}
                            enableLiveAutocompletion={true}
                            enableSnippets={true}
                            showPrintMargin={false}
                        />
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            className="px-3 py-1 rounded-lg text-theme-900 bg-emerald-600"
                            onClick={run}
                        >
                            Run
                        </button>

                        <select className="px-3 py-1 rounded-lg bg-theme-900/10">
                            <option>Python</option>
                            <option>Java</option>
                            <option>C/C++</option>
                            <option>JavaScript</option>
                        </select>
                    </div>
                    <div className="flex-auto w-full">
                        <AceEditor
                            mode="text"
                            theme="xcode"
                            width="100%"
                            height="100%"
                            fontSize="18px"
                            value={data.output}
                            readOnly={true}
                            showPrintMargin={false}
                            showGutter={false}
                            highlightActiveLine={false}
                        />
                    </div>
                </div>
                <div className="h-full"></div>
            </div>
        </div>
    );
};

export default Editor;

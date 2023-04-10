import { useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import AceEditor from "react-ace";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FileManager from "../components/FileManager";
import Navbar from "../components/Navbar";
import { Menu, Transition } from "@headlessui/react";
import { setTheme, logout, setEditorText, setEditorLang } from "../state";

import "../styles/Editor.css";

import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-min-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-plain_text";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";
import Beautify from "ace-builds/src-noconflict/ext-beautify";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/snippets/c_cpp";
import "ace-builds/src-noconflict/snippets/javascript";

const Editor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, token, user, editor } = useSelector((state) => state);

  const langs = [
    { name: "Python", elang: "python", clang: "python" },
    { name: "C", elang: "c_cpp", clang: "c" },
    { name: "C++", elang: "c_cpp", clang: "cpp" },
    { name: "Java", elang: "java", clang: "java" },
  ];

  const [data, setData] = useState({
    input: "",
    output: "",
  });

  const run = async () => {
    setData({ output: "" });
    try {
      const response = await fetch("http://localhost:8080/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lang: editor.lang.clang,
          sourcecode: editor.text,
          input: data.input,
        }),
      });

      const resData = await response.json();
      setData({ ...data, output: resData.data });
    } catch (error) {
      console.log(error);
    }
  };

  const URL = process.env.REACT_APP_SERVER_URL;

  const save = async () => {
    console.log(user.username);
    try {
      const response = await fetch(
        `${URL}/file/${user.username}/${editor.openedFile.name}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: editor.text,
          }),
        }
      );

      if (response.ok) console.log("file saved successfully");
    } catch (error) {}
  };

  return (
    <div className="flex h-full w-full flex-col text-theme-700 dark:text-theme-400">
      <Navbar className="flex items-center justify-around">
        <div className="flex items-center gap-20">
          <Navbar.Brand>CodeJupyter</Navbar.Brand>

          <div className="flex items-center gap-10">
            <Navbar.Item onClick={() => navigate("/")}>HOME</Navbar.Item>
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
                  <Menu.Items className="absolute z-10 mt-2 flex flex-col rounded-lg bg-theme-0 dark:bg-theme-950">
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

      <div className="flex w-full flex-1">
        <div className="flex h-full w-[18%] flex-col px-3 py-1">
          <FileManager />
        </div>
        <div className="flex h-full flex-auto flex-col gap-2 px-3 py-1">
          <div className="h-[70%] w-full">
            <AceEditor
              id="editor"
              mode={editor.lang.elang}
              theme="xcode"
              width="100%"
              height="100%"
              value={editor.text}
              onChange={(value) => dispatch(setEditorText({ text: value }))}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableEmmet: true,
                enableMultiselect: true,
                enableSnippets: true,
                dragEnabled: true,
                highlightSelectedWord: true,
                enableAutoIndent: true,
                animatedScroll: true,
                displayIndentGuides: true,
                fontSize: 18,
                showPrintMargin: false,
                // useWorker: true,
                tabSize: 4,
                foldStyle: "markbeginend",
              }}
              annotations={[]}
              commands={Beautify.commands}
            />
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              className="rounded bg-emerald-600 px-3 py-1 text-theme-900"
              onClick={run}
            >
              Run
            </button>

            <button
              type="button"
              className="rounded bg-emerald-600 px-3 py-1 text-theme-900"
              onClick={save}
            >
              Save
            </button>

            <div className="h-full">
              <Menu as="div" className="relative h-full">
                <Menu.Button className="flex h-full min-w-[6rem] items-center justify-between gap-2 rounded bg-theme-900/10 px-3 transition-colors ease-in-out hover:bg-accent-500 hover:text-theme-50 dark:bg-theme-50/10 dark:hover:bg-accent-400 dark:hover:text-theme-900">
                  {editor.lang.name}
                  <FontAwesomeIcon icon={solid("angle-down")} />
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
                  <Menu.Items className="absolute z-10 mt-4 flex flex-col overflow-hidden rounded-lg bg-theme-0 dark:bg-theme-950">
                    {langs.map((lang, key) => (
                      <Menu.Item
                        key={key}
                        onClick={() => dispatch(setEditorLang({ lang: lang }))}
                        className="px-3 py-1 hover:bg-theme-900/10 dark:hover:bg-theme-50/10"
                      >
                        <div>{lang.name}</div>
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="w-full flex-auto">
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

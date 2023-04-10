import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { twMerge } from "tailwind-merge";
import { Fragment, useState } from "react";
import Form from "./Form";
import { useDispatch, useSelector } from "react-redux";
import { setEditorText, setFiles, setOpenedFile } from "../state";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

const FileManager = ({ children, className }) => {
  const { user, token, files } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showInput, setShowInput] = useState({
    visible: false,
    value: "",
  });

  const URL = process.env.REACT_APP_SERVER_URL;

  const inputChange = ({ currentTarget: input }) => {
    setShowInput({ ...showInput, value: input.value });
  };

  const createFile = async () => {
    try {
      const response = await fetch(
        `${URL}/file/${user.username}/${showInput.value}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        try {
          const response = await fetch(`${URL}/files/${user.username}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const { files } = await response.json();
          console.log(files);
          dispatch(setFiles({ files: files }));
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {}
  };

  const openNewFileInput = (event) => {
    event.stopPropagation();

    setShowInput({
      ...showInput,
      visible: true,
    });
  };

  const closeNewFileInput = () => {
    setShowInput({
      visible: false,
      value: "",
    });

    createFile();
  };

  return (
    <div
      className={twMerge(
        `inline-flex h-full cursor-default flex-col overflow-scroll rounded-md bg-theme-100 px-3 py-2 dark:bg-theme-800 ${className}`
      )}
    >
      {token ? (
        <button
          className="cursor-pointer rounded bg-theme-900/10 px-3 py-2 font-bold text-theme-900 hover:bg-accent-500 hover:text-theme-50 dark:bg-theme-50/10 dark:text-theme-50 dark:hover:bg-accent-400 dark:hover:text-theme-900"
          onClick={openNewFileInput}
        >
          New
        </button>
      ) : (
        <div
          onClick={() => navigate("/auth")}
          className="cursor-pointer rounded bg-theme-900/10 px-3 py-2 text-center font-bold text-theme-900 hover:bg-accent-500 hover:text-theme-50 dark:bg-theme-50/10 dark:text-theme-50 dark:hover:bg-accent-400 dark:hover:text-theme-900"
        >
          Login to create files.
        </div>
      )}
      <div className="my-4 flex w-full flex-col gap-2">
        {showInput.visible && (
          <Form.Input
            type="text"
            id="newfileinput"
            value={showInput.value}
            onChange={inputChange}
            autoFocus={true}
            onBlur={closeNewFileInput}
            className="w-full px-3 py-1"
          />
        )}
        {files.map((file, i) => {
          return <File key={i} file={file} />;
        })}
      </div>
    </div>
  );
};

const File = ({ file, className }) => {
  const { user, token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const URL = process.env.REACT_APP_SERVER_URL;

  const [showInput, setShowInput] = useState({
    visible: false,
    value: "",
  });

  const inputChange = ({ currentTarget: input }) => {
    setShowInput({ ...showInput, value: input.value });
  };

  const loadFiles = async () => {
    try {
      const response = await fetch(`${URL}/files/${user.username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const { files } = await response.json();
      console.log(files);
      dispatch(setFiles({ files: files }));
    } catch (error) {
      console.log(error);
    }
  };

  const getFileData = async () => {
    try {
      const response = await fetch(
        `${URL}/file/${user.username}/${file.name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = await response.json();

      if (response.ok) dispatch(setEditorText({ text: data }));
    } catch (error) {}
  };

  const openFile = () => {
    dispatch(setOpenedFile({ file: file }));
    getFileData();
  };

  const renameFile = async () => {
    try {
      const response = await fetch(
        `${URL}/file/${user.username}/${file.name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            newname: showInput.value,
          }),
        }
      );

      if (response.ok) loadFiles();
    } catch (error) {}
  };

  const closeRenameFileInput = () => {
    renameFile();

    setShowInput({ visible: false, value: "" });
  };

  const deleteFile = async () => {
    try {
      const response = await fetch(
        `${URL}/file/${user.username}/${file.name}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) loadFiles();
    } catch (error) {}
  };

  return (
    <>
      {showInput.visible ? (
        <div className="flex h-8 w-fit min-w-full max-w-xs items-center justify-between overflow-hidden rounded bg-theme-900/5 px-2 text-theme-700 focus-within:text-accent-500 focus-within:ring-1 focus-within:ring-accent-500 hover:text-accent-500 dark:bg-theme-50/5 dark:text-theme-100 dark:focus-within:text-accent-400 dark:focus-within:ring-accent-400 dark:hover:text-accent-400">
          <FontAwesomeIcon icon={solid("file")} />

          <input
            type="text"
            className="h-full w-full border-none bg-transparent focus:ring-0"
            id="newfileinput"
            value={showInput.value}
            onChange={inputChange}
            autoFocus={true}
            onBlur={closeRenameFileInput}
          />
        </div>
      ) : (
        <div
          className={twMerge(
            `group flex h-8 w-fit min-w-full max-w-xs items-center justify-between rounded bg-theme-900/5 text-theme-700 hover:text-accent-500 dark:bg-theme-50/5 dark:text-theme-100 dark:hover:text-accent-400 ${className}`
          )}
          onClick={openFile}
        >
          <div className="relative flex h-6 items-center">
            <FontAwesomeIcon icon={solid("file")} />
            <span className="ml-3 truncate">{file.name}</span>
          </div>

          <div className="mr-2 h-full">
            <Menu as="div" className="relative flex h-full items-center">
              <Menu.Button className="hidden cursor-pointer text-theme-700/30 hover:text-theme-700 group-hover:block dark:text-theme-200/30 dark:hover:text-theme-200">
                <div>
                  <FontAwesomeIcon icon={solid("ellipsis-vertical")} />
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
                <Menu.Items className="absolute top-2 right-2 flex flex-col overflow-hidden rounded bg-theme-0 text-theme-700/50 dark:bg-theme-950 dark:text-theme-200/40">
                  <Menu.Item
                    className="px-3 py-1 hover:bg-theme-900/10 hover:text-theme-700 dark:hover:bg-theme-50/10 dark:hover:text-theme-200"
                    onClick={() => setShowInput({ visible: true, value: "" })}
                  >
                    <div>Rename</div>
                  </Menu.Item>
                  <Menu.Item
                    className="px-3 py-1 hover:bg-theme-900/10 hover:text-theme-700 dark:hover:bg-theme-50/10 dark:hover:text-theme-200"
                    onClick={deleteFile}
                  >
                    <div>Delete</div>
                  </Menu.Item>
                  {/* <Menu.Item className="px-3 py-1 hover:bg-theme-900/10 hover:text-theme-700 dark:hover:bg-theme-50/10 dark:hover:text-theme-200">
                    <div>Download</div>
                  </Menu.Item> */}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      )}
    </>
  );
};

export default FileManager;

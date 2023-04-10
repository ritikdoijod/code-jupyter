import { useEffect } from "react";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Features from "./pages/Features";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editor from "./pages/Editor";
import { setFiles } from "./state";
import Privacy from "./pages/Privacy";

const App = () => {
  const { theme, token, user } = useSelector((state) => state);
  const URL = process.env.REACT_APP_SERVER_URL;
  const dispatch = useDispatch();

  const routes = token ? (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/features" element={<Features />} />
    </>
  ) : (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/features" element={<Features />} />
    </>
  );

  useEffect(() => {
    theme === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [theme]);

  useEffect(() => {
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
        dispatch(setFiles({ files: files }));
      } catch (error) {
        console.log(error);
      }
    };

    if (token) loadFiles();
  }, [token]);

  return (
    <div className="app font-poppins">
      <BrowserRouter>
        <Routes>{routes}</Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

import React, { useEffect } from "react";
import Homepage from "./pages/Homepage";
import Auth from "./pages/Auth";

import "./App.css";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editor from "./pages/Editor";

const App = () => {
    const { theme, token} = useSelector((state) => state);

    const routes = token ? (
        <>
            <Route path="/" element={<Homepage />} />
            <Route path="/editor" element={<Editor />} />
        </>
    ) : (
        <>
            <Route path="/" element={<Homepage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/editor" element={<Editor />} />
        </>
    );

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>{routes}</Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;

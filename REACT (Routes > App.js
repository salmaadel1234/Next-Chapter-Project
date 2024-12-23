import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
// App Component
const App = () => {
    return (
        <Router>
            <div className="app">
                <Sidebar />
                <Routes>
                    <Route path="/feedback" element={<FeedbackTable />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

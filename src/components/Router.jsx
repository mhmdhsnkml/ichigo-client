import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";

export default () => {
  return(
    <Routes>
      <Route path="/users" element={<Home />} />
      <Route path="/users/:id" element={<Detail />} />
    </Routes>
  )
}

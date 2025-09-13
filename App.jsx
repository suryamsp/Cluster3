import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Nav_bar } from "./sub_folder/Nav_bar";
import { Hours } from "./Hours";
import { Notes } from "./sub_folder/notes";
import { useForm } from "react-hook-form";
import { useFormik } from "formik";
import { Table } from "./Table";

export default function App() {


  return (
    <div className="app_dev">
      <div><img className="logo" src="/img/ola.png"></img></div>
      <Routes>
        <Route path="" element={<><Nav_bar/><Hours/></>} />
        <Route path="/Leave" element={<Notes />} />
        <Route path="/output" element={<Table />} />

      </Routes>
    </div>
  );
}







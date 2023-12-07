import React from "react";
import "./AddNewTask.css";
import { ImCross } from "react-icons/im";
import { useFormik } from "formik";
import sucess from "../../Shades/Toastes/sucess";
import failed from "../../Shades/Toastes/failed";
import { hideModel } from "../../Hooks/handleModel";
import { getCookie } from "../../Hooks/cookies";

const AddNewTask = ({ setTask }) => {
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      title: "",
      points: "",
      link: "",
      from: "",
      to: "",
    },
    onSubmit: (values) => {
      if (!values.title || !values.points || !values.link || !values.from || !values.to) {
        return failed("Please fill the full form then try again");
      }
      fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/add_task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getCookie()}`,
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setTask(data.data)
            hideModel("add-task-model", "active-add-task-model");
            sucess("Task Created sucessfully");
            values = {};
          }
          if (data.failed) {
            failed(data.failed);
          }
        });
    },
  }); 

  return (
    <div className="common-model-style" id="add-task-model">
      <div className="inner-container">
        <div className="title-container d-flex justify-content-center py-3">
          <h5>Add New Task</h5>
          <ImCross
            onClick={() => hideModel("add-task-model", "active-add-task-model")}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Work Title</label>
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Work Points</label>
            <input
              type="text"
              name="points"
              value={values.points}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Link</label>
            <input
              type="url"
              name="link"
              value={values.link}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>From</label>
            <input
              type="date"
              name="from"
              value={values.from}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>To</label>
            <input
              type="date"
              name="to"
              value={values.to}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex justify-content-center mt-4">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
      <div
        className="model-blur-bg"
        onClick={() => hideModel("add-task-model", "active-add-task-model")}
      />
    </div>
  );
};

export default AddNewTask;
 



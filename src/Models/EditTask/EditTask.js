import React from "react";
import "./EditTask.css";
import { ImCross } from "react-icons/im";
import sucess from "../../Shades/Toastes/sucess";
import failed from "../../Shades/Toastes/failed";
import { hideModel } from "../../Hooks/handleModel";
import { getCookie } from "../../Hooks/cookies";

const EditTask = ({ selectedTask, setSelectedTask, setTask }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !selectedTask.title ||
      !selectedTask.points ||
      !selectedTask.link ||
      !selectedTask.from ||
      !selectedTask.to
    ) {
      return failed("Please fill the full form then try again");
    }

    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/edit_task/${selectedTask._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getCookie()}`,
      },
      body: JSON.stringify(selectedTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setTask(data.data);
          hideModel("edit-task-model", "active-edit-task-model");
          sucess("Task updated sucessfully");
        }

        if (data.failed) {
          failed(data.failed);
        }
      });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const currntInfo = { ...selectedTask };
    currntInfo[name] = value;
    setSelectedTask(currntInfo);
  };

  return (
    <div className="common-model-style" id="edit-task-model">
      {" "}
      <div className="inner-container">
        {" "}
        <div className="title-container d-flex justify-content-center py-3">
          {" "}
          <h5>Edit Task</h5>{" "}
          <ImCross
            onClick={() =>
              hideModel("edit-task-model", "active-edit-task-model")
            }
          />{" "}
        </div>{" "}
        <form onSubmit={handleSubmit}>
          {" "}
          <div>
            {" "}
            <label>Work Title</label>{" "}
            <input
              type="text"
              name="title"
              value={selectedTask?.title ? selectedTask.title : ""}
              onChange={handleChange}
              required
            />{" "}
          </div>{" "}
          <div>
            {" "}
            <label>Work Points</label>{" "}
            <input
              type="number"
              name="points"
              value={selectedTask?.points ? selectedTask.points : ""}
              onChange={handleChange}
              required
            />{" "}
          </div>{" "}
          <div>
            {" "}
            <label>Link</label>{" "}
            <input
              type="url"
              name="link"
              value={selectedTask?.link ? selectedTask.link : ""}
              onChange={handleChange}
              required
            />{" "}
          </div>
          <div>
            {" "}
            <label>From</label>{" "}
            <input
              type="date"
              name="from"
              value={selectedTask?.from ? selectedTask.from : ""}
              onChange={handleChange}
              required
            />{" "}
          </div>
          <div>
            {" "}
            <label>To</label>{" "}
            <input
              type="date"
              name="to"
              value={selectedTask?.to ? selectedTask.to : ""}
              onChange={handleChange}
              required
            />{" "}
          </div>{" "}
          <div className="d-flex justify-content-center mt-4">
            {" "}
            <input type="submit" value="Submit" />{" "}
          </div>{" "}
        </form>{" "}
      </div>{" "}
      <div
        className="model-blur-bg"
        onClick={() => hideModel("edit-task-model", "active-edit-task-model")}
      />{" "}
    </div>
  );
};

export default EditTask;

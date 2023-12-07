import React, { useEffect, useState } from "react";
import "./AdminStartWork.css";
import { TiEdit } from "react-icons/ti";
import { MdDelete } from "react-icons/md";

import taskImg from "../../../Assets/Images/temp/3928054.jpg";
import AddNewTask from "../../../Models/AddNewTask/AddNewTask";
import EditTask from "../../../Models/EditTask/EditTask";

import { addModel } from "../../../Hooks/handleModel";
import { getCookie } from "../../../Hooks/cookies";
import failed from "../../../Shades/Toastes/failed";
import sucess from "../../../Shades/Toastes/sucess";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../Store/LoadingSlice/LoadingSlice";

const AdminStartWork = () => {
  const [task, setTask] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/get_task`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getCookie()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          setTask(data.data);
        }
        if (data.failed) {
          failed(data.failed);
        }
      });
  }, []);

  const handleDelete = (id) => {
    dispatch(setLoading(true));
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/delete_task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getCookie()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setLoading(false));
        if (data.data) {
          setTask(data.data);
          sucess("Task Delete sucessfully");
        }
        if (data.failed) {
          failed(data.failed);
        }
      });
  };
  const handleClearTask = () => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user/task/clear_all_task`, {
      headers: {
        authorization: `Bearer ${getCookie()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.sucess) {
          sucess(data.sucess);
        }
        if (data.failed) {
          failed(data.failed);
        }
      });
  }

  return (
    <section className="start-work ">
      <div className="d-flex align-item-center">
        <h4>Admin Daily Task</h4>

        <button
          className="add-new-task"
          onClick={() => addModel("add-task-model", "active-add-task-model")}
        >
          Add New Task
        </button>
      </div>
      <div className="">
        <button
          className="clear-all-task"
          onClick={handleClearTask}
        >
          Clear All Task
        </button>
      </div>
      <div className="task-container">
        {task.length > 0 ? (
          task.map((item) => {
            return (
              <div className="inner-container" key={item._id}>
                <img src={taskImg} alt="" />
                <div className="text-conatiner">
                  <p>{item.title}</p>
                  <p>Points: {item.points}</p>
                  <p>
                    <span className="me-4">From {item.from}</span>
                    <span>To {item.to}</span>
                  </p>
                </div>
                <div className="link-container ms-auto">
                  <div className="option">
                    <TiEdit
                      onClick={() => {
                        setSelectedTask(item);
                        addModel("edit-task-model", "active-edit-task-model");
                      }}
                    />
                    <MdDelete onClick={() => handleDelete(item._id)} />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="not-task">
            {" "}
            <p>
              You Have No Task Yet <strong>!</strong>
            </p>
          </div>
        )}
      </div>
      <>
        <AddNewTask setTask={setTask} />
        <EditTask
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          setTask={setTask}
        />
      </>
    </section>
  );
};

export default AdminStartWork;

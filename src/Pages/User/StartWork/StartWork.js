import React, { useEffect, useState } from "react";
import "./StartWork.css";
import taskImg from "../../../Assets/Images/temp/3928054.jpg";
import { getCookie } from "../../../Hooks/cookies";
import failed from "../../../Shades/Toastes/failed";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../Store/UserSlice/UserSlice";

const StartWork = () => {
  const user = useSelector((state) => state.user.data);
  const [task, setTask] = useState({});
  const dispatch = useDispatch();
  console.log(user);

  useEffect(() => {
    if (user?._id) {
      fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user/get_task`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${getCookie()}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          if (data.data) {
            if (user?.dilyTaskArray?.length > 0) {
              const filterTask = data.data.filter((task) => {
                const isExist = user.dilyTaskArray.find(
                  (id) => id === task?._id
                );
                console.log(isExist);
                if (isExist) {
                  return false
                } else{
                  return true
                }
                // for (let i = 0; i < user.dilyTaskArray.length; i++) {
                //   const element = user?.dilyTaskArray[i];
                //   console.log(task?._id == element);
                //   if (task?._id !== element) {
                //     return true;
                //   }
                // }
              });
              console.log(data.data);

              console.log(filterTask);
              setTask(filterTask);
            } else {
              setTask(data.data);
            }
          }
          if (data.failed) {
            failed(data.failed);
          }
        });
    }
  }, [user]);

  const handleClick = (taskID, points, link) => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user/task/add_task_in_user`, {
      method: "POST",
      body: JSON.stringify({
        taskID,
        points,
      }),
      headers: {
        "content-type": "application/json; charset=UTF-8",
        authorization: `Bearer ${getCookie()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          dispatch(addUser(data.data));
          window.location.href = link;
        }
        if (data.failed) {
          failed(data.failed);
        }
      }); 
  };

  return (
    <section className="start-work ">
      <div>
        <h4>Your Daily Task</h4>
        <p className="p-0">Complite Task and earn points !</p>
      </div>
      <div className="task-container">
        {task.length > 0 ? (
          task.map((item) => {
            return (
              <div className="inner-container light-shadow" key={item._id}>
                <img src={taskImg} alt="" />
                <div className="text-conatiner">
                  <p>{item.title}</p>
                  <p>Points: {item.points}</p>
                </div>
                <div className="link-container ms-auto">
                  <a
                    onClick={() =>
                      handleClick(item._id, item.points, item.link)
                    }
                  >
                    Click Here
                  </a>
                </div>
              </div>
            );
          })
        ) : (
          <div className="not-task">
            <p>
              You Have No Task Yet <strong>!</strong>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default StartWork;

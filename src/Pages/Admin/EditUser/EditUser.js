import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../../../Hooks/cookies";
import Loading from "../../../Shades/Loading/Loading";
import failed from "../../../Shades/Toastes/failed";
import sucess from "../../../Shades/Toastes/sucess";

const EditUser = () => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [inputUser, setInputUser] = useState({});
  const navigate = useNavigate()

  let id = useParams().id;

  useEffect(() => {
    if (getCookie()) {
      fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/view_profile/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${getCookie()}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
            console.log("data form laoding", data);
          setLoading(false);
          if (data.data) { 
            setCurrentUser({
              fullName: data.data.fullName,
              fatherName: data.data.fatherName,
              motherName: data.data.motherName,
              dailyPoints: data.data.dailyPoints,
              regularPoints: data.data.regularPoints,
              accessPoints: data.data.accessPoints,
            });
          }
        });
    }
  }, []);

  const fromInputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const currentInfo = { ...currentUser };
    currentInfo[name] = value;
    setCurrentUser(currentInfo);
  };
  const userUpdateHandle = (e) => {
    e.preventDefault();
    
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/update_user/${id}`, {
      method: "PATCH",
      body: JSON.stringify(currentUser),
      headers: {
        "content-type": "application/json; charset=UTF-8",
        authorization: `Bearer ${getCookie()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.sucess) {
          sucess(data.sucess);
          navigate("/admin/all_user", { replace: true });
        }
        if (data.failed) { 
          failed(data.failed);
        }
      });
  };

  return (
    <section className="authentication m-auto  container">
      <form onSubmit={userUpdateHandle} autoComplete="off" autoCorrect="off">
        <h6>Register an account</h6>
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Full Name"
          name="fullName"
          value={currentUser.fullName ? currentUser.fullName : ""}
          autoComplete="off"
          style={{ textTransform: "capitalize" }}
          onChange={fromInputHandler}
          required
        />
        <label>Father Name</label>
        <input
          type="text"
          placeholder="Father Name"
          name="fatherName"
          value={currentUser.fatherName ? currentUser.fatherName : ""}
          autoComplete="off"
          style={{ textTransform: "capitalize" }}
          onChange={fromInputHandler}
          required
        />
        <label>Mother Name</label>
        <input
          type="text"
          placeholder="Mother Name"
          name="motherName"
          value={currentUser.motherName ? currentUser.motherName : ""}
          autoComplete="off"
          style={{ textTransform: "capitalize" }}
          onChange={fromInputHandler}
          required
        />
        <label>Daily Points</label>
        <input
          type="text"
          placeholder="Daily Points"
          name="dailyPoints"
          value={currentUser.dailyPoints ? currentUser.dailyPoints : ""}
          autoComplete="off"
          onChange={fromInputHandler}
          required
        />
        <label>Regular Points</label>
        <input
          type="text"
          placeholder="Regular Points"
          name="regularPoints"
          value={currentUser.regularPoints ? currentUser.regularPoints : ""}
          autoComplete="off"
          onChange={fromInputHandler}
          required
        />
        <label>Access Points</label>
        <input
          type="text"
          placeholder="Access Points"
          name="accessPoints"
          value={currentUser.accessPoints ? currentUser.accessPoints : ""}
          autoComplete="off"
          onChange={fromInputHandler}
          required
        />

        <label>Password</label>
        <input
          type="text"
          placeholder="Password"
          name="Password"
          value={inputUser.Password ? inputUser.Password : ""}
          autoComplete="off"
          onChange={fromInputHandler}
        />
        <input type="submit" value="Update User" />
      </form>
      {loading && <Loading />}
    </section>
  );
};

export default EditUser;

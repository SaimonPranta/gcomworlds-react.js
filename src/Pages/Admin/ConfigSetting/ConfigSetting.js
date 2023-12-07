import React, { useEffect, useState } from "react";
import "./ConfigSetting.css";  
import AdminSlider from "../../../Shades/AdminSlider/AdminSlider";
import { addModel } from "../../../Hooks/handleModel";
import { useDispatch, useSelector } from "react-redux";
import EditHeroImgModel from "../../../Models/EditHeroImgModel/EditHeroImgModel";
import AddLaicenceInfoModel from "../../../Models/AddLaicenceInfoModel/AddLaicenceInfoModel";
import sucess from "../../../Shades/Toastes/sucess";
import failed from "../../../Shades/Toastes/failed";
import { addConfig } from "../../../Store/ConfigSlice/ConfigSlice";
import { getCookie } from "../../../Hooks/cookies";


const ConfigSetting = () => {
  const config = useSelector((state) => state.config.data); 
  const [selectHeroImg, setSelectHeroImg] = useState("imgOne");
const dispatch = useDispatch()
const [notiInput ,setNotiInput] = useState("")
const [notification, setNotification] = useState([])

useEffect(() => {
   fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/public/notification` )
     .then((res) => res.json())
     .then((data) => {
       console.log(data);
       if (data.data) {
        setNotification(data.data)
       }
       if (data.failed) {
         failed(data.failed);
       }
     });
}, [])
const handleDelteLaicence = (imgName) => {
  if (!imgName) {
    return failed("Something is wrong, please try agian letter");
  }

  fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/public/delete_laicence`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ img: imgName }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.data) {
        dispatch(addConfig(data.data));
        sucess("Laicence info deleted sucessfull");
      }
      if (data.failed) {
        failed(data.failed);
      }
    });
};
const addNotification = (e) => {
  e.preventDefault()
  if (!notiInput) {
    return failed("Please add some text in Notification box");
  }

  fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/add_notification`, {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=UTF-8",
      authorization: `Bearer ${getCookie()}`,
    },
    body: JSON.stringify({ messsasge: notiInput }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.data) {
        sucess("Sucessfully added notification");
        setNotiInput("");
      }
      if (data.failed) {
        failed(data.failed);
      }
    });
}
const habndleNoficationDelete = (id) =>{
  fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/delete_notification/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${getCookie()}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.sucess) {
        document.getElementById(id).style.display= "none"
        sucess(data.sucess);
      }
      if (data.failed) {
        failed(data.failed);
      }
    });
}

  return (
    <section >
      <div>
        <h3 className="main-title">Setting up your website</h3>
      </div>
      <div className="home-config mt-3">
        <div className="pb-2">
          <h6>Home Config</h6>
        </div>
        <div className="slider">
          <div className="left-side">
            <AdminSlider
              imgArray={config?.sliderImg?.length > 0 ? config.sliderImg : []}
            />
          </div>
          <div className="right-side">
            <div>
              <img
                src={
                  config?.heroImg?.imgOne
                    ? `${process.env.REACT_APP_SERVER_HOST_URL}/${config?.heroImg?.imgOne}`
                    : ""
                }
                alt="img"
              />
              <button
                onClick={() => {
                  setSelectHeroImg("imgOne");
                  addModel("edit-heor-img-model", "active-edit-heor-img-model");
                }}
              >
                Edit
              </button>
            </div>
            <div>
              <img
                src={
                  config?.heroImg?.imgTwo
                    ? `${process.env.REACT_APP_SERVER_HOST_URL}/${config?.heroImg?.imgTwo}`
                    : ""
                }
                alt="img"
              />
              <button
                onClick={() => {
                  setSelectHeroImg("imgTwo");
                  addModel("edit-heor-img-model", "active-edit-heor-img-model");
                }}
              >
                Edit
              </button>
            </div>
            <div>
              <img
                src={
                  config?.heroImg?.imgThree
                    ? `${process.env.REACT_APP_SERVER_HOST_URL}/${config?.heroImg?.imgThree}`
                    : ""
                }
                alt="img"
              />
              <button
                onClick={() => {
                  setSelectHeroImg("imgThree");
                  addModel("edit-heor-img-model", "active-edit-heor-img-model");
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="laicence-config mt-3">
        <div className="pb-2">
          <h6>Laicence Config</h6>
        </div>
        <div className="add-laicence">
          <button
            onClick={() => {
              addModel(
                "add-laicence-info-model",
                "active-add-laicence-info-model"
              );
            }}
          >
            Add License
          </button>
        </div>
        <div className="inner-contaienr">
          {config?.licenceInfo?.length > 0 &&
            config.licenceInfo.map((info) => {
              return (
                <div key={info._id}>
                  <img
                    src={`${process.env.REACT_APP_SERVER_HOST_URL}/${info.img}`}
                    alt=""
                  />
                  <h6>{info.title}</h6>
                  <button
                    onClick={() => {
                      handleDelteLaicence(info.img);
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      </div>

      <div className="notification-container my-5">
        <h6>Notification Config</h6>

        <form className="add-notification my-2" onSubmit={addNotification}>
          <input
            type="text"
            value={notiInput}
            onChange={(e) => setNotiInput(e.target.value)}
            name="notification"
          />
          <input type="submit" value="Add Notification" />
        </form>
        <div className="msg-conatiner">
          {
            notification.length > 0 && notification.map(item => {
              return (
                <div key={item._id} id={item._id}>
                  <div>
                    <p>
                      {item.messsasge}
                    </p>
                    <p>{item.date}</p>
                  </div>
                  <button onClick={() => habndleNoficationDelete(item._id)}>Delete</button>
                </div>
              );
            })
          }
         
        </div>
      </div>
      <EditHeroImgModel imgObj={selectHeroImg} />
      <AddLaicenceInfoModel />
    </section>
  );
};

export default ConfigSetting;

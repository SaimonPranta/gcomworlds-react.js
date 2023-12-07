import React from "react";
import "./Laicence.css";
import { CgFileDocument } from "react-icons/cg";
import { useSelector } from "react-redux";

const Laicence = () => {
  const config = useSelector((state) => state.config.data); 

  return (
    <section className="laicence  mb-4 container-lg">
      <div className=" sub-laicence  p-3 p-md-5 ">
        <h5>Our All Laicence</h5>
        {config?.licenceInfo?.length > 0 && config?.licenceInfo.map( info => {
          return (
            <div key={info._id}>
              <h6>
                <CgFileDocument /> {info.title}
              </h6>
              <img src={`${process.env.REACT_APP_SERVER_HOST_URL}/${info.img}`} alt="" />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Laicence;

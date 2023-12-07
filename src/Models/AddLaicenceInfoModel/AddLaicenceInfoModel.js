import React, { useState } from "react";
import "./AddLaicenceInfoModel.css";
import { ImCross } from "react-icons/im";
import { hideModel } from "../../Hooks/handleModel";
import sucess from "../../Shades/Toastes/sucess";
import failed from "../../Shades/Toastes/failed";
import { useDispatch } from "react-redux";
import { addConfig } from "../../Store/ConfigSlice/ConfigSlice";

const AddLaicenceInfoModel = () => {
  const [input, setInput] = useState(null);
  const [title, setTitle] = useState(null);

  const dispatch = useDispatch()
  const handleSubmit = (e) => {
      e.preventDefault();
      if (!input) {
        return failed("Please select an image then try");
      }
      const formData = new FormData();
      formData.append("image", input);
      formData.append("title", title);

      fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/public/add_laicence`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            hideModel(
              "add-laicence-info-model",
              "active-add-laicence-info-model"
            );
            dispatch(addConfig(data.data));
            sucess("Laicence info added sucessfull");
          }
          if (data.failed) {
            failed(data.failed);
          }
        });
  };


  return (
    <div className="common-model-style" id="add-laicence-info-model">
      <div className="inner-container">
        <div className="title-container d-flex justify-content-center py-3">
          <h5>Add Laicence Info</h5>
          <ImCross
            onClick={() =>
              hideModel(
                "add-laicence-info-model",
                "active-add-laicence-info-model"
              )
            }
          />
        </div>
        <form onSubmit={handleSubmit}>
          {input && <img src={URL.createObjectURL(input)} alt="" />}

          <div>
            <label>Select Image</label>
            <input
              type="file"
              accept="image/*"
              name="img"
              onChange={(e) => setInput(e.target.files[0])}
              required
            />
          </div>
          <div>
            <label>Laicence Title</label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
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
        onClick={() =>
          hideModel("add-laicence-info-model", "active-add-laicence-info-model")
        }
      />
    </div>
  );
};

export default AddLaicenceInfoModel;

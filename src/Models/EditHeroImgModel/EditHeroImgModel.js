import React, { useState } from "react";
import "./EditHeroImgModel.css";
import { ImCross } from "react-icons/im";
import { hideModel } from "../../Hooks/handleModel";
import sucess from "../../Shades/Toastes/sucess";
import failed from "../../Shades/Toastes/failed";
import { useDispatch } from "react-redux";
import { addConfig } from "../../Store/ConfigSlice/ConfigSlice";

const EditHeroImgModel = ({imgObj}) => {
  const dispatch = useDispatch()
  const [input, setInput] = useState(null);
  const handleSubmit = (e) => {
      e.preventDefault();
      if (!input || !imgObj) {
        return failed("Please select an image then try");
      }
      const formData = new FormData();
      formData.append("image", input);

      fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/public/eddit_hero_img/${imgObj}`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            hideModel("edit-heor-img-model", "active-edit-heor-img-model");
            dispatch(addConfig(data.data));
            sucess("Image updated sucessfull");
          }
          if (data.failed) {
            failed(data.failed);
          }
        });
  };


  return (
    <div className="common-model-style" id="edit-heor-img-model">
      <div className="inner-container">
        <div className="title-container d-flex justify-content-center py-3">
          <h5>Edit Hero Section Image</h5>
          <ImCross
            onClick={() =>
              hideModel("edit-heor-img-model", "active-edit-heor-img-model")
            }
          />
        </div>
        <form onSubmit={handleSubmit}>
          {input && <img src={URL.createObjectURL(input)} alt="" />}

          <div>
            <label>Select Slider Image</label>
            <input
              type="file"
              accept="image/*"
              name="img"
              onChange={(e) => setInput(e.target.files[0])}
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
        onClick={() => hideModel("edit-heor-img-model", "active-edit-heor-img-model")}
      />
    </div>
  );
};

export default EditHeroImgModel;

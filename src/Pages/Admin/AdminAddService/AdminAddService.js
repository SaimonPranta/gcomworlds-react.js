import React from "react";
import { useState } from "react";
import "./AdminAddService.css";
import { ImCross } from "react-icons/im";
import sucess from "../../../Shades/Toastes/sucess";
import failed from "../../../Shades/Toastes/failed";
import {getCookie} from '../../../Hooks/cookies';

const AdminAddService = () => {
  const [deailsCount, setDeailsCount] = useState([""]);
  const [productInfo, setProductInfo] = useState({
    detailsArray: [],
  });

  const handleAddDetails = () => {
    const currentCount = [...deailsCount];
    currentCount.push("");
    setDeailsCount(currentCount);
  };
  const handleProductDetailsCsoss = (index) => {
    const currentCount = [...deailsCount];
    const currentProduct = { ...productInfo };
    if (currentProduct.detailsArray && currentProduct.detailsArray[index]) {
      const filterArray = currentProduct.detailsArray.filter(
        (value, currentIndex) => {
          return index != currentIndex;
        }
      );
      currentProduct["detailsArray"] = filterArray;
      setProductInfo(currentProduct);
    }

    currentCount.pop();
    setDeailsCount(currentCount);
  };
  const handleFileUpload = (e) => {
    const currentInfo = { ...productInfo };
    currentInfo["img"] = e.target.files[0];
    setProductInfo(currentInfo);
  };
  const handleProductDetails = (e, index) => {
    const name = e.target.name;
    const value = e.target.value;
    const currentInfo = { ...productInfo };

    if (!currentInfo.detailsArray[index]) {
      currentInfo.detailsArray[index] = {};
    }
    if (name == "product_type") {
      currentInfo.detailsArray[index]["property"] = value;
    } else if (name == "product_value") {
      currentInfo.detailsArray[index]["value"] = value;
    }
    setProductInfo(currentInfo);
  };

  const handleInputValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const currentInfo = { ...productInfo };
    if ((name === "discount" && value > 100) || value < 0) {
      return failed("Discount must be less then 100");
    }
    if ((name === "discountForUser" && value > 100) || value < 0) {
      return failed("Discount for User must be less then 100");
    }

    currentInfo[name] = value;
    setProductInfo(currentInfo);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (!productInfo.rating || !productInfo.viewAs) {
      productInfo["rating"] = document.getElementById("rating").value;
      productInfo["viewAs"] = document.getElementById("viewAs").value;
    }
    if (
      !productInfo.title ||
      !productInfo.dis ||
      !productInfo.price ||
      !productInfo.discount ||
      !productInfo.discountForUser ||
      !productInfo.category ||
      !productInfo.rating ||
      !productInfo.viewAs ||
      !productInfo.detailsArray[0].property ||
      !productInfo.detailsArray[0].value ||
      !productInfo.img
    ) {
      failed({ failed: "Please fill the full Form." });
      return;
    }
    formData.append("img", productInfo.img);
    formData.append("title", productInfo.title);
    formData.append("dis", productInfo.dis);
    formData.append("price", productInfo.price);
    formData.append("discount", productInfo.discount);
    formData.append("discountForUser", productInfo.discountForUser);
    formData.append("category", productInfo.category);
    formData.append("rating", productInfo.rating);
    formData.append("viewAs", productInfo.viewAs);
    formData.append("detailsArray", productInfo.detailsArray);
    formData.append("data", JSON.stringify(productInfo));

    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/services/add_service`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${getCookie()}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          sucess(data.data.sucess);
          // setSection("products");
        }
        if (data.failed) {
          failed(data.failed);
        }
      });
  };

  return (
    <section >
      <div className="common-form-styles  add-product-container">
        <h4>Add Service</h4>
        <div>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <div>
              <label>Title</label>
              <input
                required
                type="text"
                name="title"
                placeholder="Product Title"
                value={productInfo.title ? productInfo.title : ""}
                onChange={(e) => handleInputValue(e)}
              />
            </div>
            <div>
              <label>Category</label>
              <input
                required
                type="text"
                name="category"
                placeholder="Product Category"
                value={productInfo.category ? productInfo.category : ""}
                onChange={(e) => handleInputValue(e)}
              />
            </div>
            <div>
              <label>Product Discription</label>
              <input
                required
                type="text"
                name="dis"
                placeholder="Enter Product Discription"
                value={productInfo.dis ? productInfo.dis : ""}
                onChange={(e) => handleInputValue(e)}
              />
            </div>
            <div>
              <label>Product Price</label>
              <input
                required
                type="number"
                name="price"
                placeholder="Enter Product Price"
                value={productInfo.price ? productInfo.price : ""}
                onChange={(e) => handleInputValue(e)}
              />
            </div>
            <div>
              <label>Product Discount %</label>
              <input
                required
                type="number"
                name="discount"
                placeholder="Enter Product Discount"
                value={productInfo.discount ? productInfo.discount : ""}
                onChange={(e) => handleInputValue(e)}
              />
            </div>
            <div>
              <label>Discount for User%</label>
              <input
                required
                type="number"
                name="discountForUser"
                placeholder="Enter Discount for User"
                value={
                  productInfo.discountForUser ? productInfo.discountForUser : ""
                }
                onChange={(e) => handleInputValue(e)}
              />
            </div>
            <div className="select-input-common-style">
              <label>Product Rating</label>
              <select
                name="rating"
                onChange={(e) => handleInputValue(e)}
                id="rating"
              >
                <option value="1">1 start</option>
                <option value="2">2 start</option>
                <option value="3">3 start</option>
                <option value="4">4 start</option>
                <option value="5">5 start</option>
              </select>
            </div>
            <div className="select-input-common-style">
              <label>Product View As</label>
              <select
                name="viewAs"
                id="viewAs"
                onChange={(e) => handleInputValue(e)}
              >
                <option value="General">General</option>
                <option value="Flash Sales">Flash Sales</option>
              </select>
            </div>
            <div className="product-details">
              <label>Product Details</label>
              <div className="product-details-inner">
                {deailsCount &&
                  deailsCount.map((value, index) => {
                    // const property = productInfo.detailsArray[index] && productInfo.detailsArray[index].property
                    return (
                      <div className="product-wrapwer" key={index}>
                        <div>
                          <label>Details Type-{index + 1}</label>
                          <input
                            required
                            type="text"
                            value={
                              productInfo.detailsArray[index] &&
                              productInfo.detailsArray[index].property
                                ? productInfo.detailsArray[index].property
                                : ""
                            }
                            name="product_type"
                            placeholder="Enter Product Type"
                            onChange={(e) => handleProductDetails(e, index)}
                          />
                        </div>
                        <div>
                          <label>Details Value-{index + 1}</label>
                          <input
                            required
                            type="text"
                            value={
                              productInfo.detailsArray[index] &&
                              productInfo.detailsArray[index].value
                                ? productInfo.detailsArray[index].value
                                : ""
                            }
                            name="product_value"
                            placeholder="Enter Product Value"
                            onChange={(e) => handleProductDetails(e, index)}
                          />
                        </div>
                        {!index == 0 && (
                          <div
                            className="cross-icon"
                            onClick={() => handleProductDetailsCsoss(index)}
                          >
                            <ImCross />
                          </div>
                        )}
                      </div>
                    );
                  })}
                {productInfo.detailsArray.length == deailsCount.length &&
                  productInfo.detailsArray[productInfo.detailsArray.length - 1]
                    .property &&
                  productInfo.detailsArray[productInfo.detailsArray.length - 1]
                    .value && (
                    <div>
                      <button
                        type="button"
                        className="btn btn-success mt-3 d-block mx-auto"
                        onClick={handleAddDetails}
                      >
                        Add More Details
                      </button>
                    </div>
                  )}
              </div>
            </div>
            <div>
              <label>Product Images</label>
              <input
                required
                type="file"
                accept="image/*"
                name="img"
                onChange={(e) => handleFileUpload(e)}
              />
            </div>

            {productInfo.img && (
              <div className="img-container">
                <img src={URL.createObjectURL(productInfo.img)} alt="img" />
              </div>
            )}
            <div>
              <input required type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminAddService;

import React from "react";
import { useState } from "react";
import "./AdminAddProduct.css";
import { ImCross } from "react-icons/im";
import success from "../../../Shades/Toastes/sucess";
import failed from "../../../Shades/Toastes/failed";
import { getCookie } from "../../../Hooks/cookies";

const AdminAddProduct = () => {
  const [detailsCount, setDetailsCount] = useState([""]);
  const [productInfo, setProductInfo] = useState({
    detailsArray: [],
    imageArray: [],
    rating: "1",
    viewAs: "General",
  });

  const handleAddDetails = () => {
    const currentCount = [...detailsCount];
    currentCount.push("");
    setDetailsCount(currentCount);
  };
  const handleProductDetailsCross = (index) => {
    const currentCount = [...detailsCount];
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
    setDetailsCount(currentCount);
  };
  const handleFileUpload = (e) => {
    const img = e.target.files[0];

    setProductInfo((product) => {
      product.imageArray.push(img);
      return {
        ...product,
      };
    });
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
      !productInfo.imageArray.length
    ) {
      failed({ failed: "Please fill the full Form." });
      return;
    }
    // formData.append("imageArray", productInfo.imageArray);
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
    if (productInfo?.deliveryCharge) {
      formData.append("deliveryCharge", productInfo.deliveryCharge);
    }
    productInfo.imageArray.forEach((image, index) => {
      formData.append(`img${index + 1}`, image);
    });

    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/products/add_product`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${getCookie()}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          success(data.data.sucess);
          // setSection("products");
        }
        if (data.failed) {
          failed(data.failed);
        }
      });
  };


  const handleColor = (e) => {
    e.preventDefault();
    const color = productInfo?.color;
    if (!color) {
      return;
    }

    setProductInfo((state) => {
      let colorArray = [];
      if (state?.colorArray?.length) {
        colorArray = [...state.colorArray, color];
      } else {
        colorArray = [color];
      }

      return {
        ...state,
        colorArray: [...colorArray],
        color: "",
      };
    });
  };
  const handleRemoveColor = (index) => {
    setProductInfo((state) => {
      const filterArray = state.colorArray.filter((color, i) => i !== index);
      return {
        ...state,
        colorArray: [...filterArray],
      };
    });
  };

  const handleCheckSealsType = (e) => {
    const value = e.target.checked;
    const name = e.target.name;
    console.log("value", value);
    setProductInfo((state) => {
      let sealAs = [];
      if (value) {
        if (!state?.sealAs) {
          sealAs.push(name);
        } else {
          sealAs = [...state.sealAs];
          if (!state.sealAs.includes(name)) {
            sealAs.push(name);
          }
        }
      }
      if (!value) {
        console.log("state.sealAs", state.sealAs);
        if (state.sealAs) {
          sealAs = state.sealAs.filter((item) => item !== name);
          console.log("state.sealAs.includes(name)", sealAs);
        }
      }
      return {
        ...state,
        sealAs: [...sealAs],
      };
    });
  };
  console.log("productInfo", productInfo);

  return (
    <section>
      <div className="common-form-styles  add-product-container">
        <h4>Add Product</h4>
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
              <label>Product Description</label>
              <input
                required
                type="text"
                name="dis"
                placeholder="Enter Product Description"
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
            <div>
              <label>Delivery charge</label>
              <input 
                type="number"
                name="deliveryCharge"
                placeholder="Enter Delivery charge"
                value={
                  productInfo.deliveryCharge ? productInfo.deliveryCharge : ""
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
            <div className="select-input-common-style">
              <label>Seal Type</label>

              <div className="seal-type-checkbox-container">
                <div>
                  <input
                    type="checkbox"
                    name="Retail"
                    checked={
                      productInfo?.sealAs?.includes("Retail") ? true : false
                    }
                    onChange={handleCheckSealsType}
                  />
                  <p>Retail</p>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="Wholesale"
                    checked={
                      productInfo?.sealAs?.includes("Wholesale") ? true : false
                    }
                    onChange={handleCheckSealsType}
                  />
                  <p>Wholesale</p>
                </div>
              </div>
            </div>
            <div className="color-list">
              {productInfo?.colors?.map((color) => {
                return <div style={{ backgroundColor: color }}></div>;
              })}
            </div>

            <div className="set-color-container">
              <div>
                <input
                  name="color"
                  type="color"
                  value={productInfo?.color ? productInfo.color : ""}
                  onChange={handleInputValue}
                />
                <input
                  type="text"
                  value={productInfo?.color ? productInfo.color : ""}
                  name="color"
                  onChange={handleInputValue}
                  placeholder="Type color code or color name"
                />
              </div>
              <button onClick={handleColor} value="set">
                Set Color
              </button>
            </div>

            <div className="colors-container">
              {productInfo?.colorArray?.length > 0 &&
                productInfo.colorArray.map((color, index) => {
                  return (
                    <div>
                      <p
                        style={{ backgroundColor: color }}
                        onClick={(i) => handleRemoveColor(index)}
                      />
                    </div>
                  );
                })}
            </div>

            <div className="product-details">
              <label>Product Details</label>
              <div className="product-details-inner">
                {detailsCount &&
                  detailsCount.map((value, index) => {
                    // const property = productInfo.detailsArray[index] && productInfo.detailsArray[index].property
                    return (
                      <div className="product-wrapper" key={index}>
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
                            onClick={() => handleProductDetailsCross(index)}
                          >
                            <ImCross />
                          </div>
                        )}
                      </div>
                    );
                  })}

                {productInfo.detailsArray.length == detailsCount.length &&
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

            {productInfo?.imageArray?.map((img) => {
              return (
                <div className="img-container">
                  <img src={URL.createObjectURL(img)} alt="" />
                </div>
              );
            })}
            <div>
              <label>Images {productInfo?.imageArray?.length + 1}</label>
              <input
                required
                type="file"
                accept="image/*"
                name="img"
                onChange={(e) => handleFileUpload(e)}
              />
            </div>
            {/* {productInfo.img && (
              <div className="img-container">
                <img src={URL.createObjectURL(productInfo.img)} alt="img" />
              </div>
            )} */}
            <div>
              <input required type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminAddProduct;

const handleAddToCart = (productID, referID) => {
  if (
    localStorage.getItem("cartArray") == null ||
    localStorage.getItem("cartArray").length === 0
  ) {
    const array = [
      {
        id: productID,
        quantity: 1,
        referID: referID ? referID : "",
      },
    ];
    localStorage.setItem("cartArray", JSON.stringify(array));
  } else {
    const cartArray = JSON.parse(localStorage.getItem("cartArray"));
    const isAlreadyExists = cartArray.find((pdInfo) => pdInfo.id === productID);
    const newCartArray = cartArray.map((info) => {
      if (info.id === productID) {
        info["quantity"] = Number(info.quantity) + 1;
        info["referID"] = referID ? referID : "";
        // info["referID"] = info.referID ? info.referID : referID ? referID : "";
      }
      return info;
    });
    if (!isAlreadyExists) {
      newCartArray.push({
        id: productID,
        quantity: 1,
        referID: referID ? referID : "",
      });
    }
    localStorage.setItem("cartArray", JSON.stringify(newCartArray));
  }
};

const handleRemvoveToCart = (productID) => {
  if (localStorage.getItem("cartArray") == null) {
    return;
  } else {
    const cartArray = JSON.parse(localStorage.getItem("cartArray"));
    const newCartArray = cartArray.filter((info) => {
      if (info.id === productID) {
        if (info.quantity > 1) {
          info["quantity"] = Number(info.quantity) - 1;
          return info;
        }
      } else {
        return info;
      }
    });

    localStorage.setItem("cartArray", JSON.stringify(newCartArray));
  }
};
export { handleAddToCart, handleRemvoveToCart };

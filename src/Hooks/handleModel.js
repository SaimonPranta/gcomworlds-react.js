const addModel = (elementID, activeClass) => {
  console.log("call")
  const container = document.getElementById(elementID);
  container?.classList.add(activeClass);
};
const hideModel = (elementID, activeClass) => {
  const container = document.getElementById(elementID);
  container?.classList.remove(activeClass);
};

export { addModel, hideModel };

export const tableCollaps = () => {
  const element = document.getElementById("table-container");
  if (element) {
    element.classList.toggle("collps-disable");
  }
  const collapsIcon = document.getElementById("collaps-icon");
  if (collapsIcon) {
    collapsIcon.classList.toggle("collaps-icon");
  }
};

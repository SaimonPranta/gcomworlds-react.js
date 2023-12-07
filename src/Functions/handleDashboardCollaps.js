 

export const handleDashboardCollaps = () => {
  console.log("clal lsf ")
  const dashboard_navication = document.getElementById("dashboard-navication");
  dashboard_navication?.classList.toggle("active_dashboard_navication");
  const dashboard_body = document.getElementById("dashboard_body");
  dashboard_body?.classList.toggle("disable_dashboard_body");
  const dashboard_body_blur = document.getElementById("dashboard-body-blur");
  dashboard_body_blur?.classList.toggle("active-dashboard-body-blur-div");


};

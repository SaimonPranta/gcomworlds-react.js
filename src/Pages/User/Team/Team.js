import React, { useEffect, useState } from "react";
import { FaAngleDoubleDown, FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { tableCollaps } from "../../../Functions/tableCollaps";
import { getCookie } from "../../../Hooks/cookies";
import SearchBox from "../../../Shades/SearchBox/SearchBox";

const Team = () => {
  const user = useSelector((state) => state.user.data);
  const [activeMember, setActiveMember] = useState(0);
  const [allUser, setAllUser] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (user?.teamMembers?.length) {
      setActiveMember(user?.teamMembers?.length);
    }
  }, [user]);
  useEffect(() => {
    if (getCookie()) {
      fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user/volume_count`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${getCookie()}`,
        },
      })
        .then((res) => res.json())
        .then((data) => { 
          if (data.data) {
             
          }
        });
    }
  }, []);
    useEffect(() => {
      if (getCookie()) {
        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user/team_members`, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: `Bearer ${getCookie()}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.data) {
              setAllUser(data.data);
              setFilterUser([...allUser]);
            }
          });
      }
    }, []);
  useEffect(() => {
    if (searchInput.length) {
      let currentUser = allUser.filter((valuee) => {
        let stringValue = valuee.userID.toString();
        let userID = stringValue.length > 0 ? stringValue.toString() : "0";
        let varifiying = userID.includes(searchInput.toLowerCase());
        let fullName = valuee.fullName.toLowerCase();
        let finalName = fullName.includes(searchInput.toLowerCase());
        return varifiying || finalName;
      });
      setSearchUser(currentUser);
    }
  }, [searchInput]);


  const handleUserChange = (e) => {
    const vlaue = e.target.value;
    console.log(vlaue);
    if (allUser && allUser.length > 0) {
      if (vlaue === "active") {
        const allActiveUser = allUser.filter((user) => user.isActive);
        setFilterUser(allActiveUser);
      } else if (vlaue === "unactive") {
        const allUnActiveUser = allUser.filter((user) => !user.isActive);
        setFilterUser(allUnActiveUser);
      } else {
        setFilterUser([...allUser]);
      }
    }
  };

  return (
    <section className="generaion-main">
      <div>
        <h3 className="main-title">Your Team Members </h3>
      </div>
      <div className="common-form-styles">
        <div className=" genaration ">
          <div>
            <h4>Team Members Summary</h4>
          </div>
          <div className="d-flex ">
            <p>Your User ID :</p>
            <p className="ps-3">{user?.userID && user.userID}</p>
          </div>
          <div className="d-flex ">
            <p>Your Upline Referral ID :</p>
            <p className="ps-3">{user?.referID && user.referID}</p>
          </div>
          <div className="d-flex ">
            <p>Total Members :</p>
            <p className="ps-3">
              {user?.teamMembers && user?.teamMembers?.length} Person
            </p>
          </div>
          <div className="d-flex ">
            <p>Total Active Members :</p>
            <p className="ps-3">{activeMember} Person</p>
          </div>
          <div className="d-flex ">
            <p>Total Inactive Members :</p>
            <p className="ps-3">
              {user?.teamMembers?.length - activeMember} Person
            </p>
          </div>
          <div className="d-flex ">
            <p>Volume A Members :</p>
            <p className="ps-3">
              {user?.teamMembers?.length - activeMember} Person
            </p>
          </div>
          <div className="d-flex ">
            <p>Volume B Members :</p>
            <p className="ps-3">
              {user?.teamMembers?.length - activeMember} Person
            </p>
          </div>
        </div>
      </div>

      <div className="common-searc-container  pt-4 pb-0 mb-0">
        <form
          className="d-flex align-items-center flex-sm-row   pb-0 mb-0"
          autoComplete="off"
        >
          <label className="taitel me-4 mb-2 mb-sm-0">Search Users</label>
          <SearchBox
            placeholder="Type Name or User ID..."
            setSearchInput={setSearchInput}
            searchInput={searchInput}
          />
        </form>
      </div>

      <div
        className="common-table-style"
        style={{ marginTop: searchInput && "37px" }}
      >
        {!searchInput && (
          <div className="d-flex align-items-center">
            <div className="select-input-common-style sub-generation">
              <h4 className="me-2">Select User</h4>
              <select name="porvider" id="porvider" onChange={handleUserChange}>
                <option value="all">
                  <h4>All User</h4>
                </option>
                <option value="active">Active User</option>
                <option value="unactive">Unactive User</option>
              </select>
            </div>
            <FaAngleDoubleDown
              className="table-collaps-icon"
              id="collaps-icon"
              onClick={tableCollaps}
            />
          </div>
        )}
        {filterUser.length > 0 || searchUser?.length > 0 ? (
          <div
            className="active-common-table-container common-table-container"
            id="table-container"
          >
            <div className="scroll-text">
              <p>scroll it</p>
            </div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User Name</th>
                    <th>User ID</th>
                    <th>Phone Number </th>
                    <th>Daily Points</th>
                    <th>Regular Points</th>
                    <th>Access Points</th>
                    <th>Account Status</th>
                    <th>Joining Date</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody id="porfile_modal_control">
                  {searchInput.length == 0 &&
                    filterUser &&
                    filterUser.length > 0 &&
                    filterUser.map((user, index) => {
                      return (
                        <tr key={user._id}>
                          <td>{index + 1}</td>
                          <td className="table-name">{user.fullName}</td>
                          <td>{user.userID}</td>
                          <td>{user.phoneNumber}</td>
                          <td>{user.dailyPoints}</td>
                          <td>{user.regularPoints}</td>
                          <td>{user.accessPoints}</td>
                          <td>{user.isActive ? "Active" : "Unactive"}</td>
                          <td className="table-date">{user.joinDate}</td>
                          <td className="view-profile">
                            <NavLink to={"/view_profile/" + user._id}>
                              View
                            </NavLink>
                          </td>
                        </tr>
                      );
                    })}
                  {searchInput.length > 0 &&
                    searchUser?.length > 0 &&
                    searchUser.map((user, index) => {
                      return (
                        <tr key={user._id}>
                          <td>{index + 1}</td>
                          <td className="table-name">{user.fullName}</td>
                          <td>{user.userID}</td>
                          <td>{user.phoneNumber}</td>
                          <td>{user.dailyPoints}</td>
                          <td>{user.regularPoints}</td>
                          <td>{user.accessPoints}</td>
                          <td>{user.isActive ? "Active" : "Unactive"}</td>
                          <td className="table-date">{user.joinDate}</td>
                          <td className="view-profile">
                            <NavLink to={"/view_profile/" + user._id}>
                              View
                            </NavLink>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="no-history">
            <p>Your have no User Yet !</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;

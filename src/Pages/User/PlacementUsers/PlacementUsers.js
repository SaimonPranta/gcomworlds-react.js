import React, { useEffect, useState } from "react";
import "./PlacementUsers.css";
import userImg from "../../../Assets/Images/profile/avatar1.jpg";
import { getCookie } from "../../../Hooks/cookies";
import { useSelector } from "react-redux";
import failed from "../../../Shades/Toastes/failed";

const PlacementUsers = () => {
  const user = useSelector((state) => state.user.data);
  const [currentUser, setCurrentUser] = useState({});
  const [valumeA, setValumeA] = useState({});
  const [valumeB, setValumeB] = useState({});
  const [valumeASubA, setValumeASubA] = useState({});
  const [valumeASubB, setValumeASubB] = useState({});

  const [valumeBSubA, setValumeBSubA] = useState({});
  const [valumeBSubB, setValumeBSubB] = useState({});

  const [AayerOneVolumeA, setALayerOneVolumeA] = useState({});
  const [ALayerOneVolumeB, setALayerOneVolumeB] = useState({});
  const [AayerOneVolumeC, setALayerOneVolumeC] = useState({});
  const [ALayerOneVolumeD, setALayerOneVolumeD] = useState({});

  const [BayerOneVolumeA, setBLayerOneVolumeA] = useState({});
  const [BLayerOneVolumeB, setBLayerOneVolumeB] = useState({});
  const [BayerOneVolumeC, setBLayerOneVolumeC] = useState({});
  const [BLayerOneVolumeD, setBLayerOneVolumeD] = useState({});

  useEffect(() => {
    setCurrentUser({ ...user });
  }, [user]);

  useEffect(() => {
    if (currentUser?.myVolioms?.voliomA) {
      if (getCookie()) {
        fetch(
          `${process.env.REACT_APP_SERVER_HOST_URL}/user/get_placement_user/${currentUser.myVolioms.voliomA}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              authorization: `Bearer ${getCookie()}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.data) {
              setValumeA(data.data);
            }
          });
      }
    } else {
      setValumeA({});
    }
  }, [currentUser]);
  useEffect(() => {
    if (currentUser?.myVolioms?.voliomB) {
      if (getCookie()) {
        fetch(
          `${process.env.REACT_APP_SERVER_HOST_URL}/user/get_placement_user/${currentUser.myVolioms.voliomB}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              authorization: `Bearer ${getCookie()}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.data) {
              setValumeB(data.data);
            }
          });
      }
    } else {
      setValumeB({});
    }
  }, [currentUser]);
  useEffect(() => {
    if (valumeA?.myVolioms?.voliomA) {
      if (getCookie()) {
        fetch(
          `${process.env.REACT_APP_SERVER_HOST_URL}/user/get_placement_user/${valumeA.myVolioms.voliomA}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              authorization: `Bearer ${getCookie()}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.data) {
              setValumeASubA(data.data);
            }
          });
      }
    } else {
      setValumeASubA({});
    }
  }, [valumeA]);
  useEffect(() => {
    if (valumeA?.myVolioms?.voliomB) {
      if (getCookie()) {
        fetch(
          `${process.env.REACT_APP_SERVER_HOST_URL}/user/get_placement_user/${valumeA.myVolioms.voliomB}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              authorization: `Bearer ${getCookie()}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.data) {
              setValumeASubB(data.data);
            }
          });
      }
    } else {
      setValumeASubB({});
    }
  }, [valumeA]);

  useEffect(() => {
    if (valumeB?.myVolioms?.voliomA) {
      if (getCookie()) {
        fetch(
          `${process.env.REACT_APP_SERVER_HOST_URL}/user/get_placement_user/${valumeB.myVolioms.voliomA}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              authorization: `Bearer ${getCookie()}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.data) {
              setValumeBSubA(data.data);
            }
          });
      }
    } else {
      setValumeBSubA({});
    }
  }, [valumeB]);
  useEffect(() => {
    if (valumeB?.myVolioms?.voliomB) {
      if (getCookie()) {
        fetch(
          `${process.env.REACT_APP_SERVER_HOST_URL}/user/get_placement_user/${valumeB.myVolioms.voliomB}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              authorization: `Bearer ${getCookie()}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.data) {
              setValumeBSubB(data.data);
            }
          });
      }
    } else {
      setValumeBSubB({});
    }
  }, [valumeB]);

  useEffect(() => {
    if (valumeASubA?.myVolioms?.voliomA) {
      if (getCookie()) {
        fetch(
          `${process.env.REACT_APP_SERVER_HOST_URL}/user/get_placement_user/${valumeASubA.myVolioms.voliomA}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              authorization: `Bearer ${getCookie()}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.data) {
              setALayerOneVolumeA(data.data);
            }
          });
      }
    } else {
      setALayerOneVolumeA({});
    }
  }, [valumeASubA]);
  useEffect(() => {
    if (valumeASubA?.myVolioms?.voliomB) {
      if (getCookie()) {
        fetch(
          `${process.env.REACT_APP_SERVER_HOST_URL}/user/get_placement_user/${valumeASubA.myVolioms.voliomB}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              authorization: `Bearer ${getCookie()}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.data) {
              setALayerOneVolumeB(data.data);
            }
          });
      }
    } else {
      setALayerOneVolumeB({});
    }
  }, [valumeASubA]);

  useEffect(() => {
    if (valumeASubB?.myVolioms?.voliomA) {
      if (getCookie()) {
        fetch(
          `${process.env.REACT_APP_SERVER_HOST_URL}/user/get_placement_user/${valumeASubB.myVolioms.voliomA}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              authorization: `Bearer ${getCookie()}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.data) {
              setALayerOneVolumeC(data.data);
            }
          });
      }
    } else {
      setALayerOneVolumeC({});
    }
  }, [valumeASubB]);
  useEffect(() => {
    if (valumeASubB?.myVolioms?.voliomB) {
      if (getCookie()) {
        fetch(
          `${process.env.REACT_APP_SERVER_HOST_URL}/user/get_placement_user/${valumeASubB.myVolioms.voliomB}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              authorization: `Bearer ${getCookie()}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.data) {
              setALayerOneVolumeD(data.data);
            }
          });
      }
    } else {
      setALayerOneVolumeD({});
    }
  }, [valumeASubB]);

  useEffect(() => {
    if (valumeBSubA?.myVolioms?.voliomA) {
      if (getCookie()) {
        fetch(
          `${process.env.REACT_APP_SERVER_HOST_URL}/user/get_placement_user/${valumeBSubA.myVolioms.voliomA}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              authorization: `Bearer ${getCookie()}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.data) {
              setBLayerOneVolumeA(data.data);
            }
          });
      }
    } else {
      setBLayerOneVolumeA({});
    }
  }, [valumeBSubA]);
  useEffect(() => {
    if (valumeBSubA?.myVolioms?.voliomB) {
      if (getCookie()) {
        fetch(
          `${process.env.REACT_APP_SERVER_HOST_URL}/user/get_placement_user/${valumeBSubA.myVolioms.voliomB}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              authorization: `Bearer ${getCookie()}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.data) {
              setBLayerOneVolumeB(data.data);
            }
          });
      }
    } else {
      setBLayerOneVolumeB({});
    }
  }, [valumeBSubA]);

  useEffect(() => {
    if (valumeBSubB?.myVolioms?.voliomA) {
      if (getCookie()) {
        fetch(
          `${process.env.REACT_APP_SERVER_HOST_URL}/user/get_placement_user/${valumeBSubB.myVolioms.voliomA}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              authorization: `Bearer ${getCookie()}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.data) {
              setBLayerOneVolumeC(data.data);
            }
          });
      }
    } else {
      setBLayerOneVolumeC({});
    }
  }, [valumeBSubB]);
  useEffect(() => {
    if (valumeBSubB?.myVolioms?.voliomB) {
      if (getCookie()) {
        fetch(
          `${process.env.REACT_APP_SERVER_HOST_URL}/user/get_placement_user/${valumeBSubB.myVolioms.voliomB}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              authorization: `Bearer ${getCookie()}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.data) {
              setBLayerOneVolumeD(data.data);
            }
          });
      }
    } else {
      setBLayerOneVolumeD({});
    }
  }, [valumeBSubB]);

  const handleSelectPlacementUser = (userID) => {
    if (!userID) {
      return failed("You select an empty user");
    }
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user/get_placement_user/${userID}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: `Bearer ${getCookie()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setCurrentUser(data.data);
        }
      });
  };

  return (
    <section >
      <div>
        <h4>Placement Users</h4>
      </div>
      <div className="placement-user-container">
        <div className="inner-container">
          <ul>
            <li>
              <img
                src={
                  currentUser?.img
                    ? `${process.env.REACT_APP_SERVER_HOST_URL}/${currentUser?.img}`
                    : userImg
                }
                alt=""
              />
              <p
                onClick={() =>
                  handleSelectPlacementUser(
                    currentUser.userID ? currentUser.userID : null
                  )
                }
              >
                {currentUser.userID ? currentUser.userID : "Empty"}
              </p>
              <div>
                <ul>
                  <li>
                    <img
                      src={
                        valumeA?.img
                          ? `${process.env.REACT_APP_SERVER_HOST_URL}/${currentUser?.img}`
                          : userImg
                      }
                      alt=""
                    />
                    <p
                      onClick={() =>
                        handleSelectPlacementUser(
                          valumeA?.userID ? valumeA?.userID : null
                        )
                      }
                    >
                      {valumeA?.userID ? valumeA?.userID : "Empty"}
                    </p>
                    <div>
                      <ul>
                        <li>
                          <img
                            src={
                              valumeASubA?.img
                                ? `${process.env.REACT_APP_SERVER_HOST_URL}/${currentUser?.img}`
                                : userImg
                            }
                            alt=""
                          />
                          <p
                            onClick={() =>
                              handleSelectPlacementUser(
                                valumeASubA?.userID ? valumeASubA.userID : null
                              )
                            }
                          >
                            {valumeASubA?.userID ? valumeASubA.userID : "Empty"}
                          </p>

                          <div>
                            <ul>
                              <li>
                                <img
                                  src={
                                    AayerOneVolumeA?.img
                                      ? `${process.env.REACT_APP_SERVER_HOST_URL}/${currentUser?.img}`
                                      : userImg
                                  }
                                  alt=""
                                />
                                <p
                                  onClick={() =>
                                    handleSelectPlacementUser(
                                      AayerOneVolumeA?.userID
                                        ? AayerOneVolumeA?.userID
                                        : null
                                    )
                                  }
                                >
                                  {AayerOneVolumeA?.userID
                                    ? AayerOneVolumeA?.userID
                                    : "Empty"}
                                </p>
                              </li>

                              <li>
                                <img
                                  src={
                                    ALayerOneVolumeB?.img
                                      ? `${process.env.REACT_APP_SERVER_HOST_URL}/${currentUser?.img}`
                                      : userImg
                                  }
                                  alt=""
                                />
                                <p
                                  onClick={() =>
                                    handleSelectPlacementUser(
                                      ALayerOneVolumeB?.userID
                                        ? ALayerOneVolumeB?.userID
                                        : null
                                    )
                                  }
                                >
                                  {ALayerOneVolumeB?.userID
                                    ? ALayerOneVolumeB?.userID
                                    : "Empty"}
                                </p>
                              </li>
                            </ul>
                          </div>
                        </li>

                        <li>
                          <img
                            src={
                              valumeASubB?.img
                                ? `${process.env.REACT_APP_SERVER_HOST_URL}/${currentUser?.img}`
                                : userImg
                            }
                            alt=""
                          />
                          <p
                            onClick={() =>
                              handleSelectPlacementUser(
                                valumeASubB?.userID ? valumeASubB.userID : null
                              )
                            }
                          >
                            {valumeASubB?.userID ? valumeASubB.userID : "Empty"}
                          </p>

                          <div>
                            <ul>
                              <li>
                                <img
                                  src={
                                    AayerOneVolumeC?.img
                                      ? `${process.env.REACT_APP_SERVER_HOST_URL}/${currentUser?.img}`
                                      : userImg
                                  }
                                  alt=""
                                />
                                <p
                                  onClick={() =>
                                    handleSelectPlacementUser(
                                      AayerOneVolumeC?.userID
                                        ? AayerOneVolumeC?.userID
                                        : null
                                    )
                                  }
                                >
                                  {AayerOneVolumeC?.userID
                                    ? AayerOneVolumeC.userID
                                    : "Empty"}
                                </p>
                              </li>

                              <li>
                                <img
                                  src={
                                    ALayerOneVolumeD?.img
                                      ? `${process.env.REACT_APP_SERVER_HOST_URL}/${currentUser?.img}`
                                      : userImg
                                  }
                                  alt=""
                                />
                                <p
                                  onClick={() =>
                                    handleSelectPlacementUser(
                                      ALayerOneVolumeD?.userID
                                        ? ALayerOneVolumeD?.userID
                                        : null
                                    )
                                  }
                                >
                                  {ALayerOneVolumeD?.userID
                                    ? ALayerOneVolumeD?.userID
                                    : "Empty"}
                                </p>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li>
                    <img
                      src={
                        valumeB?.img
                          ? `${process.env.REACT_APP_SERVER_HOST_URL}/${currentUser?.img}`
                          : userImg
                      }
                      alt=""
                    />
                    <p>{valumeB?.userID ? valumeB?.userID : "Empty"}</p>
                    <div>
                      <ul>
                        <li>
                          <img
                            src={
                              valumeBSubA?.img
                                ? `${process.env.REACT_APP_SERVER_HOST_URL}/${currentUser?.img}`
                                : userImg
                            }
                            alt=""
                          />
                          <p
                            onClick={() =>
                              handleSelectPlacementUser(
                                valumeBSubA?.userID ? valumeBSubA?.userID : null
                              )
                            }
                          >
                            {valumeBSubA?.userID
                              ? valumeBSubA?.userID
                              : "Empty"}
                          </p>

                          <div>
                            <ul>
                              <li>
                                <img
                                  src={
                                    BayerOneVolumeA?.img
                                      ? `${process.env.REACT_APP_SERVER_HOST_URL}/${currentUser?.img}`
                                      : userImg
                                  }
                                  alt=""
                                />
                                <p
                                  onClick={() =>
                                    handleSelectPlacementUser(
                                      BayerOneVolumeA?.userID
                                        ? BayerOneVolumeA?.userID
                                        : null
                                    )
                                  }
                                >
                                  {BayerOneVolumeA?.userID
                                    ? BayerOneVolumeA?.userID
                                    : "Empty"}
                                </p>
                              </li>
                              <li>
                                <img
                                  src={
                                    BLayerOneVolumeB?.img
                                      ? `${process.env.REACT_APP_SERVER_HOST_URL}/${currentUser?.img}`
                                      : userImg
                                  }
                                  alt=""
                                />
                                <p
                                  onClick={() =>
                                    handleSelectPlacementUser(
                                      BLayerOneVolumeB?.userID
                                        ? BLayerOneVolumeB?.userID
                                        : null
                                    )
                                  }
                                >
                                  {BLayerOneVolumeB?.userID
                                    ? BLayerOneVolumeB?.userID
                                    : "Empty"}
                                </p>
                              </li>
                            </ul>
                          </div>
                        </li>

                        <li>
                          <img
                            src={
                              valumeBSubB?.img
                                ? `${process.env.REACT_APP_SERVER_HOST_URL}/${currentUser?.img}`
                                : userImg
                            }
                            alt=""
                          />
                          <p
                            onClick={() =>
                              handleSelectPlacementUser(
                                valumeBSubB?.userID ? valumeBSubB.userID : null
                              )
                            }
                          >
                            {valumeBSubB?.userID ? valumeBSubB.userID : "Empty"}
                          </p>
                          <div>
                            <ul>
                              <li>
                                <img
                                  src={
                                    BayerOneVolumeC?.img
                                      ? `${process.env.REACT_APP_SERVER_HOST_URL}/${currentUser?.img}`
                                      : userImg
                                  }
                                  alt=""
                                />
                                <p
                                  onClick={() =>
                                    handleSelectPlacementUser(
                                      BayerOneVolumeC?.userID
                                        ? BayerOneVolumeC?.userID
                                        : null
                                    )
                                  }
                                >
                                  {BayerOneVolumeC?.userID
                                    ? BayerOneVolumeC?.userID
                                    : "Empty"}
                                </p>
                              </li>

                              <li>
                                <img
                                  src={
                                    BLayerOneVolumeD?.img
                                      ? `${process.env.REACT_APP_SERVER_HOST_URL}/${currentUser?.img}`
                                      : userImg
                                  }
                                  alt=""
                                />
                                <p
                                  onClick={() =>
                                    handleSelectPlacementUser(
                                      BLayerOneVolumeD?.userID
                                        ? BLayerOneVolumeD?.userID
                                        : null
                                    )
                                  }
                                >
                                  {BLayerOneVolumeD?.userID
                                    ? BLayerOneVolumeD?.userID
                                    : "Empty"}
                                </p>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PlacementUsers;

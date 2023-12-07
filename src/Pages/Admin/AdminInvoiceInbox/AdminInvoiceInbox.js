import React, { useEffect, useRef, useState } from "react";
import "./AdminInvoiceInbox.css";
import proImg from "../../../Assets/Images/profile/avatar1.jpg";
import failed from "../../../Shades/Toastes/failed";
import { getCookie } from "../../../Hooks/cookies";
import { useSelector } from "react-redux";
const scaltonCount = ["", "", "", "", ""];

const AdminInvoiceInbox = () => {
  const user = useSelector((state) => state.user.data);
  const [input, setInput] = useState("");
  const [reciverInfo, setReciverInfo] = useState({});

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState([]);
    const scrollRef = useRef();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/message/get_all_message`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getCookie()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);

        if (data.data) {
          setMsg(data.data);
        }
        if (data.failed) {
          failed(data.failed);
        }
      });
  }, []);

  const handleSendMsg = (e) => {
    e.preventDefault();
    if (
      input.toString().length < 2 &&
      reciverInfo?.conversetionID &&
      !loading
    ) {
      return;
    }
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/message/create_admin_message`,
      {
        method: "POST",
        body: JSON.stringify({
          message: input,
          conversetionID: reciverInfo.conversetionID,
          reciverID: reciverInfo.senderID,
        }),
        headers: {
          "content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${getCookie()}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);

        if (data.data) {
          const currentMsg = [...msg];
          currentMsg.push(data.data);
          setMsg(currentMsg);
          setInput("");
          // sucess("Point Transfer sucessfull");
        }
        if (data.failed) {
          failed(data.failed);
        }
      });
  };
useEffect(() => {
  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
}, [msg]);

  return (
    <div >
      <div>
        <h3 className="py-3">Invoice Inbox</h3>
        <h5>Chat With Support Team </h5>
      </div>
      <div className="messanger-container">
        {msg?.length ? (
          msg.map((ms, index) => {
            return (
              <div
                // className={"text-boxy"}
                className={
                  ms.senderID === "admin" ? "text-boxy me" : "text-boxy "
                }
                ref={scrollRef}
                key={index}
              >
                <div className="user-info admin-user-info">
                  <img
                    src={
                      user?.img
                        ? `${process.env.REACT_APP_SERVER_HOST_URL}/${user.img}`
                        : proImg
                    }
                    alt=""
                  />
                  <h6>
                    {ms.senderID === "admin" ? "Support Team" : ms.senderID}
                  </h6>
                  {ms.senderID !== "admin" && (
                    <button onClick={() => setReciverInfo(ms)}>Replay</button>
                  )}
                  {ms.senderID === "admin" && ms?.reciverID && (
                    <strong className="admin-sender-name">
                      {ms.reciverID}
                    </strong>
                  )}
                </div>
                <div className="msg-container">
                  <p>{ms.message}</p>
                </div>
              </div>
            );
          })
        ) : (
          <>
            {scaltonCount?.length &&
              scaltonCount.map((count, index) => {
                return (
                  <div
                    // className={"text-boxy"}
                    className={
                      Number(index % 2) === 0 ? "scalton" : "scalton me"
                    }
                    key={index}
                  >
                    <div className="user-info">
                      <div />
                      <h6 />
                    </div>
                    <div className="msg-container">
                      <p />
                      <p />
                      <p />
                    </div>
                  </div>
                );
              })}
          </>
        )}
      </div>
      <div className="send-msg-box admin-send-msg-box">
        {reciverInfo?.senderID ? (
          <>
            <p>Send to: {reciverInfo?.senderID}</p>
            <form onSubmit={handleSendMsg}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />{" "}
              <button type="submit">Send</button>
            </form>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AdminInvoiceInbox;

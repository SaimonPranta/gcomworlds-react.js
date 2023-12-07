import React, { useState } from "react";
import "./Footer.css";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { ImLinkedin2 } from "react-icons/im";
import { IoLogoGoogleplus } from "react-icons/io";
import { TiMessages } from "react-icons/ti";
import { BiSupport } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { TbWorld } from "react-icons/tb";
import { GoLocation } from "react-icons/go";
import { Link } from "react-router-dom";


const Footer = () => {
  const [user, setUser] = useState({});

  return (
    <section className="footer light-shadow pt-3 pb-5">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-12 pb-sm-0 pb-4 ps-sm-0 ps-4">
            <h3 className="">Contact Us</h3>
            <div className=" d-grid contact">
              {user?._id && user?.role !== "demo" && (
                <span>
                  {" "}
                  <Link
                    to={"/messenger/635ab6dc7e3136117a619052"}
                    className="message"
                  >
                    <TiMessages /> Live Chat
                  </Link>
                </span>
              )}
              <span>
                <BiSupport /> 01300019690
              </span>
              <span>
                <HiOutlineMail /> GcomWorld@gmail.com
              </span>
              <span>
                <TbWorld /> www.GcomWorld.com
              </span>
              <span>
                <GoLocation /> GEC more, Nasirabad, Chittagong, Bangladesh
              </span>
            </div>
          </div>
          <div className="col-sm-6 col-12 ps-sm-5 ps-4">
            <h3 className="">Follow Us</h3>
            <div className=" socila">
              <span>
                <FaFacebookF />
              </span>
              <span>
                <BsTwitter />
              </span>
              <span>
                <ImLinkedin2 />
              </span>
              <span>
                <IoLogoGoogleplus />
              </span>
            </div>
          </div>
        </div>
        <div className=" text-center py-2 copyright">
          <span>
            © Copyright 2021 - {new Date().getFullYear()} | GcomWorld.com
          </span>
        </div>
      </div>
    </section>
  );
};

export default Footer;

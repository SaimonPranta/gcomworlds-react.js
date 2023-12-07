import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addALLUser } from "../Store/AllUserSlice/AllUserSlice";
import { addCart } from "../Store/CartSlice/CartSlice";
import { addConfig } from "../Store/ConfigSlice/ConfigSlice";
import { setLoading } from "../Store/LoadingSlice/LoadingSlice";
import { addUser } from "../Store/UserSlice/UserSlice";
import { getCookie } from "./cookies";

const useLoginChecker = () => {
  const user = useSelector((state) => state.user.data);
  const config = useSelector((state) => state.config.data);
  const allUser = useSelector((state) => state.allUser.data); 
  const [cooki] = useState(getCookie());
  const dispatch = useDispatch();

  useEffect(() => {
    if (!config?._id) {
      dispatch(setLoading(true));
      fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/public/get_config`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          dispatch(setLoading(false));
          if (data.data) {
            dispatch(addConfig(data.data));
          }
        });
    }
  }, []);

  useEffect(() => {
    if (!user._id) {
      if (cooki) {
        dispatch(setLoading(true));
        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user/read_user_by_cooki_info`, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: `Bearer ${cooki}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
          console.log(data);

            dispatch(setLoading(false));
            if (data.data) {
              dispatch(addUser(data.data));
            }
          });
      }
    }
  }, []);



  useEffect(() => {
    let count = 0;
    const cartArray = JSON.parse(localStorage.getItem("cartArray"));
    if (cartArray?.length > 0) {
        const filterArray = cartArray.filter((pd) => pd.id && pd.quantity);
        filterArray.map((pd) => {
          count = count + Number(pd.quantity);
        });
        dispatch(addCart(count));
    }
  }, []);

  return user;
};

export default useLoginChecker;

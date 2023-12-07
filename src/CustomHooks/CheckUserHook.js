/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { getCookie } from "../Hooks/cookies";
import { addUser } from "../Store/UserSlice/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const checkUser = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.data);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (getCookie() && !user?._id) {
          setLoading(true);
          const response = await fetch(
            `${process.env.REACT_APP_SERVER_HOST_URL}/user/read_user_by_cooki_info`,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                authorization: `Bearer ${getCookie()}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const jsonData = await response.json();

          if (jsonData.data) {
            dispatch(addUser(jsonData.data));
            //   Navigate(from, { replace: true });
          }
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, error };
};

export default checkUser;

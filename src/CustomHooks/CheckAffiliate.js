/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addQuery } from "../Store/Query/QuerySlice";

const checkAffiliate = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const referAffiliateID = urlParams.get("ref");
    if (referAffiliateID) {
      dispatch(addQuery(referAffiliateID));
      sessionStorage.setItem("referAffiliateID", referAffiliateID);
    } else {
      const affiliateID = sessionStorage.getItem("referAffiliateID");
      dispatch(addQuery(affiliateID));
    }
  }, []);
};

export default checkAffiliate;

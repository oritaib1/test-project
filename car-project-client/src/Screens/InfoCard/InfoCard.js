import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./InfoCard.css";
import { setData } from "../../Redux/Action";

export const InfoCard = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const insertData = () => {
    if (user.email == "") {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData != null) {
        dispatch(
          setData({
            firstName: userData.firstName,
            lastName: userData.lastName,
            phoneNumber: userData.phoneNumber,
            email: userData.email,
            id: userData.id,
            token: userData.token,
          })
        );
      }
    }
  };
  useEffect(() => {
    insertData();
  });

  return (
    <div className="card-control">
      <div className="card">
        <ul>
          <li>{user.firstName}</li>
          <li>{user.lastName}</li>
          <li>{user.email}</li>
          <li>{user.phoneNumber}</li>
        </ul>
      </div>
    </div>
  );
};

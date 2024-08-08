import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React, { useEffect } from "react";

import style from "./User.module.css";
import { useDispatch, useSelector } from "react-redux";
import { GET_USER } from "../../redux/actions/types";
import { getAction } from "../../redux/actions/readAction";

const User = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.authReducer);
  const { token } = useSelector((state) => state.authReducer);
  useEffect(() => {
    dispatch(getAction("users", GET_USER));
  }, [dispatch]);
  console.log(token);
  // eslint-disable-next-line array-callback-return
  let myMap = users.map((u) => {
    if (u.username === token) {
      return (
        <div className={style.info}>
          <h1>
            Usename: <b>{u.username}</b>
          </h1>
          <h1>
            Email: <b>{u.email}</b>
          </h1>
        </div>
      );
    }
  });

  // eslint-disable-next-line array-callback-return
  let myMap2 = users?.map((u) => {
    if (u.username === token) {
      return (
        <div className={style.info}>
          <h1>
            First name: <b>{u.name.firstname}</b>
          </h1>
          <h1>
            Last name: <b>{u.name.lastname}</b>
          </h1>
          <h1>
            Address city: <b>{u.address.city}</b>
          </h1>
          <h1>
            Address street: <b>{u.address.street}</b>
          </h1>
          <h1>
            Zipcode: <b>{u.address.zipcode}</b>
          </h1>
          <h1>
            Phone: <b>{u.phone}</b>
          </h1>
        </div>
      );
    }
  });

  return (
    <div className={style.body}>
      <div className={style.ava}>
        <Avatar size={100} icon={<UserOutlined />} />
        {myMap}
      </div>
      <div>{myMap2}</div>
    </div>
  );
};

export default User;

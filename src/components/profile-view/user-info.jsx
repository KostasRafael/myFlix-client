import React from "react";

export const UserInfo = ({ userEmail, nameOfUser, handleUserDelete }) => {
  return (
    <>
      <h4>Your Info</h4>
      <p>Name: {nameOfUser}</p>
      <p>e-mail: {userEmail}</p>
      <button onClick={handleUserDelete}>Delete Account</button>
    </>
  );
};

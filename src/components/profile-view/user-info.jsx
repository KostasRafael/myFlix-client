import React from "react";

function UserInfo({ emailOfUser, nameOfUser, handleUserDelete }) {
  return (
    <>
      <h4>Your Info</h4>
      <p>Name: {nameOfUser}</p>
      <p>e-mail: {emailOfUser}</p>
      <button onClick={handleUserDelete}>Delete Account</button>
    </>
  );
}

export default UserInfo;

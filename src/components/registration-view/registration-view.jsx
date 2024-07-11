import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap/";

//import "./registration-view.scss";

export function RegistrationView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
}

const handleSubmit = (e) => {
  e.preventDefault();
  axios
    .post("https://murmuring-ridge-94608-7a62e12e52db.herokuapp.com/users", {
      Username: username,
      Password: password,
      Email: email,
    })
    .then((response) => {
      const data = response.data;
      console.log(data);
      window.open("/", "_self");
    })
    .catch((e) => {
      console.log("error registering the user");
      alert("Something wasn't right");
    });
};

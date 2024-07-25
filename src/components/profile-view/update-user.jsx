import React from "react";
import { Form } from "react-bootstrap";
import { useState } from "react";

function UpdateUser() {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
    };

    const updateUrl = `https://murmuring-ridge-94608-7a62e12e52db.herokuapp.com/users/${localUser.Username}`;

    fetch(updateUrl, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("User info has been successfully updated");
        response.json().then((updatedUser) => {
          localStorage.setItem("user", JSON.stringify(updatedUser));
          console.log(updatedUser);
        });
        window.location.reload();
      } else {
        alert("update failed");
      }
    });
  }

  return (
    <>
      <h4>Update user</h4>
      <Form className="profile-form" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter a username"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="8"
            placeholder="Your password must be 8 or more characters"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email address"
          />
        </Form.Group>
        <button variant="primary" type="submit">
          Update
        </button>
      </Form>
    </>
  );
}

export default UpdateUser;

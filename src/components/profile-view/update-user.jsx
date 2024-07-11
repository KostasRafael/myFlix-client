import React from "react";
import { Form } from "react-bootstrap";

function UpdateUser({ handleSubmit, handleUpdate }) {
  return (
    <Form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          defaultValue={user.Username}
          onChange={(e) => handleUpdate(e)}
          required
          placeholder="Enter a username"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          defaultValue=""
          onChange={(e) => handleUpdate(e)}
          required
          minLength="8"
          placeholder="Your password must be 8 or more characters"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          defaultValue={user.Email}
          onChange={(e) => handleUpdate(e)}
          required
          placeholder="Enter your email address"
        />
      </Form.Group>
      <button variant="primary" type="submit">
        Update
      </button>
    </Form>
  );
}

export default UpdateUser;

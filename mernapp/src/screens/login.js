import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credential, setcredential] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json; charset = UTF-8",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    })
      .then((e) => {
        console.log(e.status);
        if (e.status == 200) {
          navigate("/");
          console.log("finally done");
        } else {
          alert("Incorrect credential");
          setError("password is incorrect..!!");
          console.log("failed miserably");
        }
      })
      .catch(() => {
        console.log("loginfailed");
      });
  };
  const onChange = function (event) {
    setcredential({ ...credential, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="md-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credential.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credential.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">
            I'm a new user
          </Link>
        </form>
      </div>
      <div> {error}</div>
    </div>
  );
}

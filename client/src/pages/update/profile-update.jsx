import "./profile-update.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import appAxios from "../../lib/appAxios";
import { useAuth } from "../../context/auth-context";

function ProfileUpdatePage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, updateUser } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await appAxios.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
      });

      if (res.data) {
        updateUser(res.data);
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-update">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button disabled={isLoading} type="submit">
            Update
          </button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="side-container">
        <img
          src={currentUser.avatar || "/noavatar.jpg"}
          alt=""
          className="avatar"
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;

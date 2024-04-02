import "./single-page.scss";

import DOMPurify from "dompurify";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import { Slider } from "../../components/slider/slider";
import { Map } from "../../components/map/map";
import { useAuth } from "../../context/auth-context";
import { appAxios } from "../../lib/appAxios";

function SinglePage() {
  const singlePostData = useLoaderData();
  const [saved, setSaved] = useState(singlePostData.isSaved);
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const handleSave = async () => {
    setSaved((prevSaved) => !prevSaved);
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      await appAxios.post("/users/save", { postId: singlePostData.id });
    } catch (error) {
      console.log(error);
      setSaved((prevSaved) => !prevSaved);
    }
  };

  return (
    <div className="single-page">
      <div className="details">
        <div className="wrapper">
          <Slider images={singlePostData.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{singlePostData.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{singlePostData.address}</span>
                </div>
                <div className="price">$ {singlePostData.price}</div>
              </div>
              <div className="user">
                <img src={singlePostData.user.avatar} alt="" />
                <span>{singlePostData.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(singlePostData.postDetail.desc),
              }}
            />
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="list-vertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="feature-text">
                <span>Utilities</span>
                {singlePostData.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="feature-text">
                <span>Pet Policy</span>
                {singlePostData.postDetail.pet === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="feature-text">
                <span>Income Policy</span>
                <p>{singlePostData.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{singlePostData.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{singlePostData.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{singlePostData.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="list-horizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="feature-text">
                <span>School</span>
                <p>{singlePostData.postDetail.school}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="feature-text">
                <span>Bus Stop</span>
                <p>{singlePostData.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="feature-text">
                <span>Restaurant</span>
                <p>{singlePostData.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="map-container">
            <Map items={[singlePostData]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
                color: saved ? "white" : "black",
              }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;

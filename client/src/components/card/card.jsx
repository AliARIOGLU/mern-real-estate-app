import "./card.scss";

import { Link } from "react-router-dom";

export const Card = ({ item }) => {
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="image-container">
        <img src={item.images[0]} alt={item.title} />
      </Link>
      <div className="text-container">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="Pin" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="features">
              <img src="/bed.png" alt="Bed" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="features">
              <img src="/bath.png" alt="Bed" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="Save" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="Chat" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

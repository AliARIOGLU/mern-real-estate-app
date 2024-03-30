import "./searchbar.scss";

import { useState } from "react";

export const Searchbar = () => {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (type) => {
    setQuery((prev) => ({ ...prev, type }));
  };

  return (
    <div className="searchbar">
      <div className="type">
        <button
          className={query.type === "buy" ? "active" : ""}
          onClick={() => switchType("buy")}
        >
          Buy
        </button>
        <button
          className={query.type === "rent" ? "active" : ""}
          onClick={() => switchType("rent")}
        >
          Rent
        </button>
      </div>
      <form>
        <input type="text" name="location" placeholder="City Location" />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={1000000}
          placeholder="Minimum Price"
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={1000000}
          placeholder="Maksimum Price"
        />
        <button>
          <img src="/search.png" alt="Search" />
        </button>
      </form>
    </div>
  );
};

import "./filter.scss";

export const Filter = () => {
  return (
    <div className="filter">
      <h1>
        Search results for <b>London</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input type="text" name="city" id="city" placeholder="Location" />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select name="type" id="type">
            <option value="">Any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select name="property" id="property">
            <option value="">Any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Minimum Price</label>
          <input
            type="number"
            name="minPrice"
            id="minPrice"
            placeholder="Any"
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Maksimum Price</label>
          <input
            type="number"
            name="maxPrice"
            id="maxPrice"
            placeholder="Any"
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">Bedroom Count</label>
          <input type="number" name="bedroom" id="bedroom" placeholder="Any" />
        </div>
        <button>
          <img src="/search.png" alt="Search" />
        </button>
      </div>
    </div>
  );
};

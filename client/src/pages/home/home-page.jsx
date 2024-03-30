import "./home-page.scss";

import { Searchbar } from "../../components/searchbar/searchbar";

function HomePage() {
  return (
    <div className="home-page">
      <div className="text-container">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p className="description">
            Welcome! CodexEstate offers you the most comprehensive and reliable
            solutions to find your dream home. We&apos;re here to guide you
            through thousands of real estate listings to help you make the right
            choice. Find the home of your dreams and change your life.
          </p>
          <Searchbar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Exprience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>1200+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="img-container">
        <img src="/bg.png" alt="Hero" />
      </div>
    </div>
  );
}

export default HomePage;

import React from "react";
import "./home.css";

export default function Home() {
  return (
    <div className="body">
      <main className="main-section">
        {/* <div className="container">
          <h1 className="main-text">The number one job site for developers</h1>
        </div> */}
        <div className="overlay" />
      </main>

      {/* <section className="slideshow">
        <div className="image-one" />
        <div className="image-two" />
        <div className="image-three" />
      </section> */}

      <section className="cards">
        {/* <div className="connect">
          <div className="card-image" />
          <h2 className="card-title">Connect</h2>
          <p className="card-text"></p>
        </div> */}
        {/* <div className="satisfaction">
          <div className="cards-image" />
          <h2 className="card-title">Satisfaction</h2>
          <p className="card-text"></p>
        </div> */}
        {/* <div className="technologies">
          <div className="cards-image" />
          <h2 className="card-title">Technologies</h2>
          <p className="card-text"></p>
        </div> */}
      </section>
    </div>
  );
}

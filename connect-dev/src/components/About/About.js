import React from "react";
import Footer from '../Footer/Footer';
import "./about.css";

export default function About() {
  return (
    <div>
      <div className="about-container">
        <h1 className="about-header">About ConnectDev</h1>
        <section className="about-created">
          <h3 className="section-title">How was ConnectDev Founded?</h3>
          <hr />
          <p className="section-text">
            ConnectDev was founded at DevMountain in Dallas, Texas. ConectDev
            started as an idea and grew into a company. ConnectDev was created
            with the sole purpose of taking the stress of finding a job, and
            throwing it out the window! Here at ConnectDev, we believe that
            finding a job should be the least of your worries. ConnectDev is the
            best developer connection website in the entire world! We listen to
            all of our users and focus on improving your experience.
          </p>
        </section>
        <section className="about-creator">
          <h3 className="section-title">Who created ConnectDev?</h3>
          <hr />
          <p className="section-text">
            ConnectDev was created by Aaron Blackshear when he was 18 years old.
            ConnectDev was originally a project for DevMountain, designed to
            show off his technical skills, before he decided to carry on with
            the idea and start his own developer connection website. Aaron
            disliked how stressful it was to find a job and wanted to do
            something about it, and thus, ConnectDev was born.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}

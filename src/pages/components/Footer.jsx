import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-white">
      <div className="container p-4">
        <section className="mb-4">
          <p>
            We are dedicated to helping animals find their forever homes. Our mission is to connect
            adoptable pets with loving families and provide the support and resources necessary to
            ensure a successful adoption.
          </p>
        </section>
        <section>
          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="bi bi-facebook"></i>
          </a>

          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="bi bi-twitter"></i>
          </a>

          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="bi bi-google"></i>
          </a>

          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="bi bi-instagram"></i>
          </a>

          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="bi bi-linkedin"></i>
          </a>

          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="bi bi-github"></i>
          </a>
        </section>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
        <p>&copy; 2023 Our Business: Animal Adoption</p>
      </div>
    </footer>
  );
};

export default Footer;

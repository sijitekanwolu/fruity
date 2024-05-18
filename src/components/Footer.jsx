import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-footer p-10 px-5 bg-base-200 text-base-content">
      <aside>
        <h2 className="text-xl text-green-400 font-bold">FRUITY</h2>
        <p className="text-white">
          Fruity is an e-commerce website that sells various flavors of high{" "}
          <br />
          quality and delicious fruit jams that you can enjoy
        </p>
      </aside>
      <nav>
        <h6 className="footer-title text-green-400">Services</h6>
        <a className="link link-hover text-white">Branding</a>
        <a className="link link-hover text-white">Design</a>
        <a className="link link-hover text-white">Marketing</a>
        <a className="link link-hover text-white">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title text-green-400">Company</h6>
        <a className="link link-hover text-white">About us</a>
        <a className="link link-hover text-white">Contact</a>
        <a className="link link-hover text-white">Jobs</a>
        <a className="link link-hover text-white">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title text-green-400">Legal</h6>
        <a className="link link-hover text-white">Terms of use</a>
        <a className="link link-hover text-white">Privacy policy</a>
        <a className="link link-hover text-white">Cookie policy</a>
      </nav>
    </footer>
  );
};

export default Footer;

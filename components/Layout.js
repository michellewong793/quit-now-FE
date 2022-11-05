

import Link from "next/link";

const linkStyle = {
  marginRight: 15,
  fontFamily: "Spartan",
  textDecoration: "none",
  color: "black",
};

const paragraph = {
  fontFamily: "Spartan",
  textDecoration: "none",
  color: "black",
};

const header = {
  position: "fixed",
  padding: "1rem",
  top: 0,
  left: 0,
  width: "100%",
  height: "1rem",
  color: "white",
};

const footer = {
  position: "fixed",
  marginBottom: "3rem",
  bottom: 0,
  width: "100%",
  height: "1rem",
  color: "white",
  display: "flex",
  justifyContent: "center",
  marginLeft: "3rem"
};

const Header = () => (
  <div style={header}>
     <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
    <Link href="/">
      <a style={linkStyle}>Earn</a>
    </Link>
  </div>
);

const Layout = () => {
  return (
    <>
      {" "}
      <Header /> <Footer />
    </>
  );
};

const Footer = () => (
  <div style={footer}>
    <a style={linkStyle} href="https://github.com/bookvacuum/quitnow">
      {" "}
      Smart Contract Repo{" "}
    </a>
    <a style={linkStyle} href="https://github.com/michellewong793/quit-now-FE">
      {" "}
      Frontend Repo{" "}
    </a>
    <a
      style={linkStyle}
      href="    https://www.twitter.com/bentowalletxyz
"
    >
      {" "}
     Twitter{" "}
    </a>
  </div>
);

export default Layout;
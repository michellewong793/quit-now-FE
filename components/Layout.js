

import Link from "next/link";

const linkStyle = {
  marginRight: 35,
  fontFamily: "Baloo Bhai",
  textDecoration: "none",
  color: "white",
  fontSize: "2rem"
};

const paragraph = {
  fontFamily: "Baloo Bhai",
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
  position:"absolute", 
   bottom:"0",
   width:"100%",
   height:"60px", 
   paddingLeft: "5rem",  /* Height of the footer */
};

const Header = () => (
  <div style={header}>
     <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
    <Link href="/jolenes">
      <a style={linkStyle}>Jolene Kiyoko Story</a>
    </Link>
    <Link href="https://tally.so/r/me5rqO">
      <a style={linkStyle}>Earn</a>
    </Link>
  </div>
);

const Layout = () => {
  return (
    <>
      {" "}
      <Header /> 
    </>
  );
};

const Footer = () => (
  <div style={footer}>
    <a style={linkStyle} href="https://tally.so/r/me5rqO">
      {" "}
      Start Earning{" "}
    </a>
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
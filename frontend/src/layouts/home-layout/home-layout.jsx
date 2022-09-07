import React, { useContext } from "react";
import NavbarMain from "../../Components/NavbarMain/NavbarMain";
import Footer from "../../Components/Footer/Footer";
import ConnectWalletModal from "../../Components/ConnectWalletModal/ConnectWalletModal";
import ConnectModalContext from "../../context/connectModal/ConnectModalContext";

export default function HomeLayout(props) {
  const { showModal, setShowModal } = useContext(ConnectModalContext);
  return (
    <>
      <div className="home-layout">
        <NavbarMain />
        <div className="main">{props.children}</div>
        <Footer />
      </div>
      <ConnectWalletModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

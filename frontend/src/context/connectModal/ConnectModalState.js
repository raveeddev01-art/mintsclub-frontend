import React, { useState } from "react";
import ConnectModalContext from "./ConnectModalContext";

const ConnectModalState = (props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <ConnectModalContext.Provider value={{ showModal, setShowModal }}>
      {props.children}
    </ConnectModalContext.Provider>
  );
};

export default ConnectModalState;

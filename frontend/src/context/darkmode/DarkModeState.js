import React, { useState } from 'react';
import DarkModeContext from './DarkModeContext';

const DarkModeState = (props) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {props.children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeState;

// export function useUserContext() {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error("useUserContext can only be used inside UserProvider");
//   }
//   return context;
// }

// import React from 'react';
// // import Stack from '@mui/material/Stack';
// import { Snackbar } from '@material-ui/core'
// import MuiAlert from '@material-ui/lab/Alert';
// import { hideAlert } from '../features/alert/alertSlice';
// import { useDispatch, useSelector } from 'react-redux';

// const Alert = React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// export default function CustomizedSnackbars() {
//     const dispatch = useDispatch()
//     const message = useSelector(state => state.alert?.alertData);

//     const handleClose = (event, reason) => {
//         dispatch(hideAlert())
//     };


//     return (
//         <div spacing={2} sx={{ width: '100%' }}>
//             <Snackbar open={message?.show} autoHideDuration={5000} onClose={handleClose}
//                 anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             >
//                 <Alert variant={'filled'} onClose={handleClose} severity={message?.severity} sx={{ width: '100%' }}>
//                     {/* <AlertTitle> */}
//                         {/* {message.title} */}
//                     {/* </AlertTitle> */}
//                     {message.message}
//                 </Alert>
//             </Snackbar>
//         </div>
//     );
// }


// import React, { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { hideAlert } from "../../../store/reducers/alertSlice";
// import jwtAuthService from "../../services/jwtAuthService";

function AlertComponent(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

function CustomizedAlerts(props) {
    const message = useSelector(state => state.alert?.alertData);
  const classes = useStyles();
  let dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideAlert())
  };

  

  return (
    <div
      className={classes.root}
      style={{ position: "absolute", top: "50%", bottom: "50%" }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={message.show}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <AlertComponent severity={message.severity}>
          <AlertTitle>{message.title}</AlertTitle>
          {message.message}
        </AlertComponent>
      </Snackbar>
    </div>
  );
}

export default CustomizedAlerts;

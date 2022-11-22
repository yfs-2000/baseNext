import React from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Close from "components/icon/close";
const Login = (props) => {
  const { open, handleClose } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="login-dialog"
    >
      <div
        style={{
          background: "#000",
          height: "100%",
        }}
      >
        <div>Sign up</div>
        <Close onClick={() => {}} width={12} height={12} />
      </div>
    </Dialog>
  );
};

export default Login;

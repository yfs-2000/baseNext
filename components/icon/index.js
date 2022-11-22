import React from "react";
import IconButton from "@mui/material/IconButton";
const Icon = (props) => {
  const { children, onClick, color = "primary", ...values } = props;
  return (
    <IconButton onClick={onClick} color={color}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox={`0 0 ${values.width} ${values.height}`}
        {...values}
      >
        {children}
      </svg>
    </IconButton>
  );
};

export default Icon;

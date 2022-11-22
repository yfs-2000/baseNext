import React from "react";
import Login from "components/login";
import { useBoolean } from "ahooks";

const Index = () => {
  const [loginShow, { setTrue, setFalse }] = useBoolean(false);
  return (
    <div>
      <button onClick={setTrue}>登录</button>
      <Login open={loginShow} handleClose={setFalse} />
    </div>
  );
};

export default Index;

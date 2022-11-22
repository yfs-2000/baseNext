import React from "react";
import Header from "./Header";
//全局布局组件
const Content = (props) => {
  const { children } = props;
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Content;

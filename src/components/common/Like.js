import React from "react";
//import { FaHeart, FaRegHeart } from "react-icons/fa";

const Like = props => {  
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";

  return (
    <>
      <i
        className={classes}
        style={{ cursor: "pointer" }}
        onClick={props.onClick}
      />  
    </>
  );  
};

export default Like;

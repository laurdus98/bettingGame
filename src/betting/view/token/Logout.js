import React, { useState, useEffect } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

export function Logout() {
  const [logOut, setLogOut] = useState(false);

  useEffect(() => {
    if (!logOut) {
      localStorage.clear();
      window.location.href = "/";
      setLogOut(true);
    }
  }, [logOut, setLogOut]);

  return (
    <ThumbUpIcon
      style={{
        fontSize: 150,
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
      }}
    />
  );
}

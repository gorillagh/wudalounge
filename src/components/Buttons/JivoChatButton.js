import React, { useEffect, useRef } from "react";

function hideJivoButton() {
  const jivoButton = document.querySelector("#jvlabel");
  if (jivoButton) {
    jivoButton.style.display = "none";
  }
}

function showJivoButton() {
  const jivoButton = document.querySelector("#jvlabel");
  if (jivoButton) {
    jivoButton.style.display = "block";
  }
}

const JivoChatWidget = () => {
  const jivoButtonRef = useRef(null);

  useEffect(() => {
    const jivoButton = document.querySelector("#jivo_container");
    console.log(jivoButton);
    if (jivoButton) {
      jivoButton.style.display = "none";
      const jivoSdk = document.querySelector('script[src*="jivosite"]');
      console.log(jivoSdk);
      jivoSdk.onload = () => {
        jivoButton.style.display = "none";
      };
    }
  }, []);

  return <div ref={jivoButtonRef}></div>;
};

export default JivoChatWidget;

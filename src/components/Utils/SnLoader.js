import React from "react";
import { useSelector } from "react-redux";
import "./SnLoaderStyles.css";

export default function SnLoader(props) {
  const snLoader = useSelector((state) => state.snLoader);
  return (
    <>
      {snLoader && (
        <div className="sn-loader-overlay">
          <div className="lds-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
}

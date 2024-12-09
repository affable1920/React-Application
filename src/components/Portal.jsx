import React from "react";
import ReactDOM from "react-dom";
import { IoIosCloseCircle } from "react-icons/io";

const Portal = ({ open, onClose, children }) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div id="overlay" />
      <div id="modal">
        <div id="modal-header">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <IoIosCloseCircle
          className="close-modal-btn"
          style={{ cursor: "pointer" }}
          onClick={onClose}
        />
        <div id="modal-content">{children}</div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Portal;

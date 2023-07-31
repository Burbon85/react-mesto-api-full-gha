import React from "react";

function InfoTooltip({ isOpen, title, onClose, image }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="infotooltip">
        <img className="infotooltip__image" src={image} alt={title} />
        <h2 className="infotooltip__title">{title}</h2>
        <button
          className="popup__close"
          type="button"
          name="close-button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;

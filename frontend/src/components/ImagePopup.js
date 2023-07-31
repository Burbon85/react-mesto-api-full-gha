import React from "react";

function ImagePopup({ isOpen, onClose, card }) {
  return (
    <div className={`popup popup-image ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container-image">
        <div className="popup__opened-image">
          <img className="popup__image" alt={card.name} src={card.link} />
          <p className="popup__subtitle-image">{card.name}</p>
        </div>
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

export default ImagePopup;

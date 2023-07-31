import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, ...props }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      // onSubmit = {() => console.log("work")}
      textButton="Создать"
    >
      <input
        className="popup__field popup__field_type_name popup__field_name"
        id="popup__field_name"
        type="text"
        name="place"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
      />
      <span
        className="popup__field-error error-place error-height-top"
        id="popup__field_name-error"
      ></span>
      <input
        className="popup__field popup__field_type_job popup__field_link"
        id="popup__field_link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={link || ""}
        onChange={(e) => setLink(e.target.value)}
      />
      <span
        className="popup__field-error error-link error-height-bottom"
        id="popup__field_link-error"
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
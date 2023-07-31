import React, { useRef, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const ref = useRef();

  useEffect(() => {
    ref.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar:
        ref.current.value /* Значение инпута, полученное с помощью рефа */,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton="Сохранить"
    >
      <input
        className="popup__field"
        id="avatar"
        type="url"
        name="popup__field_avatar"
        placeholder="Ссылка на каринку"
        ref={ref}
        required
      />
      <span
        className="popup__field-error error-link error-height-top"
        id="avatar-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

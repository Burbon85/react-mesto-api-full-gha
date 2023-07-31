import React, { useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, ...props }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton="Сохранить"
    >
      <input
        className="popup__field popup__field_type_name popup__field_type_name-profile"
        id="popup__field_type_name-profile"
        type="text"
        name="name"
        placeholder="Жак-Ив Кусто"
        required
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
      />
      <span
        className="popup__field-error error-name error-height-top"
        id="popup__field_type_name-profile-error"
      />
      <input
        className="popup__field popup__field_type_job popup__field_type_job-profile"
        id="popup__field_type_job-profile"
        type="text"
        name="job"
        placeholder="Исследователь океана"
        required
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={(e) => setDescription(e.target.value)}
      />
      <span
        className="popup__field-error error-info error-height-bottom"
        id="popup__field_type_job-profile-error"
      />
    </PopupWithForm>
  );
}
export default EditProfilePopup;

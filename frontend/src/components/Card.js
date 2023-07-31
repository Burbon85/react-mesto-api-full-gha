import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onImagePopup, handleLikeClick, handleDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__button ${
    isLiked && "element__button_active"
  }`;
  return (
    <article className="element">
      <img
        className="element__img"
        src={card.link}
        alt={card.name}
        onClick={() => {
          onCardClick(card);
          onImagePopup();
        }}
      />
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={() => {
              handleLikeClick(card);
            }}
          ></button>
          <h3 className="element__number-like">{card.likes.length}</h3>
        </div>
      </div>
      {/* Далее в разметке используем переменную для условного рендеринга */}
      {isOwn && (
        <button
          className="element__button_trash"
          onClick={() => {
            handleDeleteClick(card);
          }}
        />
      )}
    </article>
  );
}

export default Card;

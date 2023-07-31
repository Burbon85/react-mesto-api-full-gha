import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onImagePopup,
  cards,
  onCardDelete,
  onCardLike
}) {
  const currentUser = useContext(CurrentUserContext);
  
  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-hover" onClick={onEditAvatar}>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
          />
        </button>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements"> 
      {cards.map((card) => {
           return (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onImagePopup={onImagePopup}
              handleDeleteClick={onCardDelete}
              handleLikeClick={onCardLike}
            />
          ); 
        })}
      </section>
    </main>
  );
}

export default Main;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom"; // импортируем Routes
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import auth from "../utils/Auth";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ok from "../images/ok.svg";
import err from "../images/err.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [userData, setUserData] = useState({ password: "", email: "" });
  const [infoTooltipText, setInfoTooltipText] = useState("");
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);

  useEffect(() => {
    api.getToken();
    if (loggedIn) {
      api
        .getNeededAll()
        .then(([dataForUserInfo, dataForInitialCards]) => {
          // const [dataForUserInfo, dataForInitialCards] = result;
          setCurrentUser(dataForUserInfo);
          setCards(dataForInitialCards);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);
  useEffect(() => {
    tockenCheck();
  }, []);

  function tockenCheck() {
    // эта функция проверит валидность токена
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // проверим токен
      auth.getContent(jwt)
        .then((response) => {
          // авторизуем пользователя
          setLoggedIn(true);
          setUserData({
            email: response.email,
          });
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }

  function userRegister({ password, email }) {
    auth
      .register({ password, email })
      .then(() => {
        setRegistered(true);
        setInfoTooltipText("Вы успешно зарегистрировались!");
        setInfoTooltipOpen(true);
        navigate("/sign-in");
      })
      .catch((error) => {
        setRegistered(false);
        setInfoTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
        setInfoTooltipOpen(true);
        console.log(error);
      });
  }

  function userLogin({ password, email }) {
    auth
      .authorize({ password, email })
      .then((response) => {
        localStorage.setItem("jwt", response.token);
        setLoggedIn(true);
        setUserData({
          password: password,
          email: email,
        });
        api.getToken();
        navigate("/");
      })
      .catch((error) => {
        setRegistered(false);
        setInfoTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
        setInfoTooltipOpen(true);
        console.log(error);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserData({ password: "", email: "" });
    navigate("/sign-in");
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setInfoTooltipOpen(false);
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteClick(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
      // console.log(card._id);
  }

  function handleUpdateUser({ name, about }) {
    api
      .patchUserInfo({ name, about })
      .then((userProfile) => {
        setCurrentUser(userProfile);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api
      .patchAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .createNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleProfileClick(isEditProfilePopupOpen) {
    setIsEditProfilePopupOpen(isEditProfilePopupOpen);
  }
  function handlePlaceClick(isAddPlacePopupOpen) {
    setIsAddPlacePopupOpen(isAddPlacePopupOpen);
  }
  function handleAvatarClick(isEditAvatarPopupOpen) {
    setIsEditAvatarPopupOpen(isEditAvatarPopupOpen);
  }
  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          {/* ниже разместим защищённые маршруты */}
          {/* и передадим несколько пропсов: loggedIn, path, component */}
          <Route
            exact
            path="/"
            element={
              <>
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={Header}
                  headerText="Выйти"
                  linkTo={"/sign-in"}
                  userEmail={userData.email}
                  signOut={handleSignOut}
                />

                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={Main}
                  onEditProfile={handleProfileClick}
                  onAddPlace={handlePlaceClick}
                  onEditAvatar={handleAvatarClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteClick}
                  onImagePopup={() => setIsImagePopupOpen(true)}
                />

                <ProtectedRoute loggedIn={loggedIn} element={Footer} />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Header headerText={"Войти"} linkTo={"/sign-in"} userEmail="" />
                <Register isLoggedId={loggedIn} onRegister={userRegister} />
              </>
            }
          />

          <Route
            path="/sign-in"
            element={
              <>
                <Header
                  headerText={"Регистрация"}
                  linkTo={"/sign-up"}
                  userEmail=""
                />
                <Login onLoginUser={userLogin} />
              </>
            }
          />
          <Route
            path="*"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          title={infoTooltipText}
          onClose={closeAllPopups}
          image={registered ? ok : err}
        />


      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

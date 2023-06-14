import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import ImagePopup from "./ImagePopup";

import { token, api } from "../utils/api";
import { authApi } from "../utils/auth";

import ProtectedRoute from "./ProtectedRoute";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const navigate = useNavigate();

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccessRegister, setIsSuccessRegister] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [headerEmail, setHeaderEmail] = useState("");

  const [serverErrorText, setServerErrorText] = useState("");

  //функция запрос на получение карточек
  async function getCards() {
    try {
      const cards = await api.getCards(); // cards []
      setCards(cards);
    } catch (e) {
      setIsSuccessPopupOpen(true);
      setServerErrorText("Не удалось загрузить карточки");
    }
  }

  //функция запрос на получение данных профиля (имя. о себе. аватар)
  async function getUserInfo() {
    try {
      const userData = await api.getUserInfo();
      setCurrentUser(userData);
    } catch (e) {
      setIsSuccessPopupOpen(true);
      setServerErrorText("Не удалось загрузить данные профиля");
    }
  }

  // Получение данных о пользователе и карточки с сервера
  useEffect(() => {
    if (isLoggedIn) {
      getUserInfo();
      getCards();
    }
  }, [isLoggedIn]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleOpenAddPlace = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
    setDeletedCard(null);
    setIsSuccessPopupOpen(false);
  };

  // функция по проверке лайков и их постановкой и удаления
  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id); // Снова проверяем, есть ли уже лайк на этой карточке

    // Отправляем запрос в API и получаем обновлённые данные карточки
    // добавляем лайк
    api
      .updateLikes(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    // назначаем удаляемую карточку
    setDeletedCard(card._id);
  }

  function handleConfirmDelete() {
    setIsLoading(true);
    api
      .deleteCardApi(deletedCard)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== deletedCard));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    api
      .editProfile(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(newAvatar) {
    setIsLoading(true);
    api
      .editProfileAvatar(newAvatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(cardsData) {
    setIsLoading(true);
    api
      .createCard(cardsData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isSuccessPopupOpen ||
    selectedCard ||
    isConfirmPopupOpen;

  useEffect(() => {
    function closePopupByEscape(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", closePopupByEscape);
      return () => document.removeEventListener("keydown", closePopupByEscape);
    }
  }, [isOpen]);

  async function onRegister(authData) {
    try {
      await authApi.register(authData);
      setIsSuccessPopupOpen(true);
      setIsSuccessRegister(true);
      navigate("/sign-in");
    } catch (e) {
      const { error, message } = await e.json();
      setIsSuccessRegister(false);
      setIsSuccessPopupOpen(true);
      setServerErrorText(
        "Что-то пошло не так! Попробуйте ещё раз." || error || message
      );
    }
  }

  async function onLogin(authData) {
    try {
      const { token } = await authApi.login(authData);
      localStorage.setItem("jwt", token);
      setIsLoggedIn(true);
      setHeaderEmail(authData.email);
      navigate("/");
    } catch (e) {
      const { message } = await e.json();
      setIsSuccessRegister(false);
      setIsSuccessPopupOpen(true);
      setServerErrorText("Что-то пошло не так! Попробуйте ещё раз." || message);
    }
  }

  useEffect(() => {
    if (token) {
      authApi
        .checkToken(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setHeaderEmail(res.data.email);
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [navigate, isLoggedIn]);

  function handleSignOut() {
    localStorage.removeItem(token);
    setHeaderEmail("");
    setIsLoggedIn(false);
    navigate("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  route=""
                  title="Выйти"
                  onSignOut={handleSignOut}
                  headerEmail={headerEmail}
                  isLoggedIn={isLoggedIn}
                />
                <ProtectedRoute
                  path="/"
                  isloggedIn={isLoggedIn}
                  component={Main}
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleOpenAddPlace}
                  onCardClick={setSelectedCard}
                  onCardLike={handleCardLike} // добавление и удаление лайков
                  onCardDelete={handleCardDelete}
                />
                <Footer />
              </>
            }
          />

          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />

          <Route
            path="/sign-up"
            element={
              // TODO ./pages
              <>
                <Header title="Войти" route="/sign-in" />
                <Register onRegister={onRegister} title="Регистрация" />
              </>
            }
          />

          <Route
            path="/sign-in"
            element={
              // TODO ./pages
              <>
                <Header title="Регистрация" route="/sign-up" />
                <Login onLogin={onLogin} title="Вход" />
              </>
            }
          />
        </Routes>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
          onClose={closeAllPopups}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
          onClose={closeAllPopups}
        />

        <ConfirmDeletePopup
          isOpen={!!deletedCard}
          onConfirm={handleConfirmDelete}
          onLoading={isLoading}
          onClose={closeAllPopups}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          name={"success"}
          isOpen={isSuccessPopupOpen}
          isSuccess={isSuccessRegister}
          onClose={closeAllPopups}
          serverErrorText={serverErrorText}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
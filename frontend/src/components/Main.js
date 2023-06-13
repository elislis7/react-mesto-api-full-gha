import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {

  const { cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete } = props;
  const currentUser = React.useContext(CurrentUserContext);

	return (
    <main className="content">
      <section className="profile">
        <div className="profile__container-avatar">
          <img className="profile__avatar" src={currentUser.avatar} alt={currentUser.name}/>
          <button className="profile__edit-avatar-button" 
            type="button" 
            aria-label="Кнопка редактирования аватара профиля" 
            onClick={() => {onEditAvatar(true)}}>
          </button>
        </div>
        <div className="profile__info">
          <div className="profile__info-edit">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <button className="profile__edit-button" 
              type="button" 
              aria-label="Кнопка редактирования профиля" 
              onClick={() => {onEditProfile(true)}}>
            </button>
          </div>
          <p className="profile__info-description">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" 
          type="button" 
          aria-label="Кнопка добавления контента" 
          onClick={() => {onAddPlace(true)}}>
        </button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card 
            key={card._id} // название пропса = {значение}
            card={card}
            onCardClick={onCardClick} // название пропса = {значение}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
	);
}

export default Main;
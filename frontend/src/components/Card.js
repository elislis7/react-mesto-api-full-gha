import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  const { card, onCardClick, onCardLike, onCardDelete } = props;
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id; // определяем мы ли владельцы текущей карточки
  
  const isLiked = card.likes.some(i => i._id === currentUser._id); // определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const cardLikeBattonClassName = (`element__heart ${isLiked && 'element__heart_active'}`); // создаем переменную, которую после зададим в `className` для кнопки лайка

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick}/>
      <div className="element__designation">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__container_like">
          <button className={cardLikeBattonClassName} 
            type="button" 
            name="button" 
            aria-label="Кнопка сердца"
            onClick={handleLikeClick}
          />
          <p className="element__heart-numbers">{card.likes.length}</p>
        </div>
        {isOwn && 
        <button className="element__trash" 
          type="button" 
          name="button" 
          aria-label="Кнопка удаления" 
          onClick={handleDeleteClick}/>
        }
      </div>
    </article>
	);
}

export default Card;
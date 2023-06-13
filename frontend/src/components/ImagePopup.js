import React from 'react';

function ImagePopup(props) {

  const { card, onClose } = props

	return (
		<div className={`popup image ${card.link && 'popup_opened'}`}>
      <div className="popup__image-container">
        <button className="popup__close-icon" 
          type="button" 
          name="button" 
          aria-label="Кнопка закрытия вкладки"
          onClick={onClose}>
        </button>
        <img className="popup__place-image" src={card.link} alt={card.name} />
        <h3 className="popup__title-image">{card.name}</h3>
      </div>
    </div>
	);
}

export default ImagePopup;
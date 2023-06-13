import React from 'react';

function PopupWithForm(props) { 

  const { name, title, children, isOpen, onClose, buttonText, onSubmit } = props

  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close-icon" 
          type="button" 
          name="button" 
          aria-label="Кнопка закрытия вкладки"
          onClick={onClose}>
        </button>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          <h3 className="popup__title">{title}</h3>
          {children}
          <button className="popup__submit-button" 
            id='submit-button' 
            type="submit" 
            name="button">
            { buttonText || 'Сохранить' }
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
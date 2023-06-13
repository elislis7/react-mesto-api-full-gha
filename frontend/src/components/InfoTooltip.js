import React from 'react';

function InfoTooltip(props) {

  const { name, isOpen, onClose, isSuccess, serverErrorText } = props;

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
    >
      <div className="popup__container">
        <button className="popup__close-icon" 
          type="button" 
          name="button" 
          aria-label="Кнопка закрытия вкладки"
          onClick={onClose}>
        </button>
        <div className={`popup__success ${
          isSuccess
            ? 'popup__success_type_ok'
            : 'popup__success_type_fail'}`}
        />
        <h2 className="popup__title-success">
          {isSuccess
            ? 'Вы успешно зарегистрировались!'
            : serverErrorText
          }
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
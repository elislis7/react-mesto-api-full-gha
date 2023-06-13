import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup(props) {
  const { isOpen, onClose, onLoading, onConfirm } = props;

  function handleSubmit(e) {
    e.preventDefault(); // запрещаем работу браузера по умолчанию
    onConfirm();
  }

  return (
    <PopupWithForm
      name='confirm'
      title='Вы уверены?'
      buttonText={onLoading ? 'Удаление...' : 'Да'}
      isOpen={isOpen}
      onClose={onClose} 
      onSubmit={handleSubmit}
      >
    </PopupWithForm>
  );
}

export default ConfirmDeletePopup;
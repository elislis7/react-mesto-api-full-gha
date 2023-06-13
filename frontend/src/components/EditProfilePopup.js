import React, { useEffect, useContext, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser, onLoading } = props;
  const currentUser = useContext(CurrentUserContext);

  const [ name, setName ] = useState('');
  const [ about, setAbout ] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [ currentUser, isOpen ]);

  function handleSubmit(e) {
    e.preventDefault(); // запрещаем работу браузера по умолчанию
    // передаем зн-я редактируемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: about,
    });
  }

  // обработчик изменения инпута обновляет стейт
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      buttonText={onLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose} 
      >
        <input
          className="popup__input"
          id='input-name' 
          name="name"
          type="text"
          placeholder="Имя"
          value={name || ''} 
          onChange={handleChangeName}
          minLength={2} maxLength={40}
          required />
        <span className="name-error input-name-error" />
        <input
          className="popup__input"
          id='input-description'
          type="text" 
          name="about"
          placeholder="О себе"
          value={about || ''} 
          onChange={handleChangeAbout}
          minLength={2} maxLength={200}
          required />
        <span className="description-error input-description-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
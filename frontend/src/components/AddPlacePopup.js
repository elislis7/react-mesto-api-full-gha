import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace, onLoading } = props;

  const [ placeName, setPlaceName ] = useState('');
  const [ placeLink, setPlaceLink ] = useState('');

  useEffect(() => {
    setPlaceName('');
    setPlaceLink('');
  }, [ isOpen ]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  // обработчик изменения инпута обновляет стейт
  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangePlaceLink(e) {
    setPlaceLink(e.target.value);
  }

  return ( 
    <PopupWithForm
      name='place'
      title='Новое место'
      buttonText={onLoading ? 'Создание...' : 'Создать'}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      >
        <input
          className="popup__input"
          id='input-title'
          type="text" 
          name="name"
          placeholder="Название"
          value={placeName || ''} 
          onChange={handleChangePlaceName}
          minLength={2} maxLength={30}
          required />
        <span className="title-error input-title-error" />
        <input 
          className="popup__input"
          id='input-link'
          type="url" 
          name="link"
          placeholder="Ссылка на картинку"
          value={placeLink || ''} 
          onChange={handleChangePlaceLink}
          required />
        <span className="link-error input-link-error" />
    </PopupWithForm>
  );
}
export default AddPlacePopup;
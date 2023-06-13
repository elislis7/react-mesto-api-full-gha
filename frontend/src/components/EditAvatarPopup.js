import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  
  const { isOpen, onClose, onUpdateAvatar, onLoading  } = props;
  const avatarRef = useRef(null);

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [ isOpen ]);

  function handleSubmit(e) {
    e.preventDefault(); // запрещаем работу браузера по умолчанию
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      buttonText={onLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
        <input
          className="popup__input"
          name='avatar'
          id='input-avatar'
          type='url'
          placeholder='Ссылка на картинку'
          ref={avatarRef}
          required />
        <span className="avatar-error input-avatar-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
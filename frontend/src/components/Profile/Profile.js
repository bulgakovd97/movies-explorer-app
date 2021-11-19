import React, { useContext, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import { useFormWithValidation } from '../../hooks/useForm';

const Profile = ({ isLoggedIn, onUpdateUser, showError, errorMessage, isSending, onLogout }) => {
  const { values, setValues, errors, isValid, handleInputChange } = useFormWithValidation();

  const currentUser = useContext(CurrentUserContext);

  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isSaveClicked, setIsSaveClicked] = useState(false);

  const handleEditClick = () => {
    setIsEditClicked(true);
    setIsSaveClicked(false);

    setValues(currentUser);
  }

  const handleSaveSubmit = (evt) => {
    evt.preventDefault();

    setIsSaveClicked(true);
    setIsEditClicked(false);

    if (values.name === currentUser.name && values.email === currentUser.email) {
      return;
    } else {
      onUpdateUser(values);
    }
  }

  const handleLogout = () => {
    onLogout();
  };


  return (
    <section className='profile'>
      <Header isLoggedIn={isLoggedIn} />

      <div className='profile__container'>
        <h2 className='profile__greeting'>
          {`Привет, ${currentUser.name}!`}
        </h2>
        <form
          className='profile__form'
          name='edit-form'
          onSubmit={handleSaveSubmit}
        >
          <fieldset className='profile__form-set'>
            <div className='profile__input-container'>
              <label className='profile__label profile__label_type_name' htmlFor='name-input'>
                Имя
              </label>
              <input
                className='profile__input profile__input_type_name'
                id='name-input'
                type='text'
                name='name'
                value={!isEditClicked ? currentUser.name : values.name}
                placeholder='Ваше имя'
                required
                minLength='2'
                maxLength='30'
                onChange={handleInputChange}
                disabled={!isEditClicked || isSending}
              />
            </div>
            <span className={`profile__input-error ${!isValid && 'profile__input-error_visible'}`}>
              {errors.name || ''}
            </span>
            <div className='profile__input-container'>
              <label className='profile__label profile__label_type_email' htmlFor='email-input'>
                E-mail
              </label>
              <input
                className='profile__input profile__input_type_email'
                id='email-input'
                type='email'
                name='email'
                value={!isEditClicked ? currentUser.email : values.email}
                placeholder='Ваш E-mail'
                required
                minLength='2'
                maxLength='30'
                onChange={handleInputChange}
                disabled={!isEditClicked || isSending}
              />
            </div>
            <span className={`profile__input-error ${!isValid && 'profile__input-error_visible'}`}>
              {errors.email || ''}
            </span>
            <span className={`profile__message profile__message_${showError ? 'error' : 'success'}`}>
              {showError ? errorMessage : isSaveClicked ? 'Данные пользователя успешно обновлены!' : ''}
            </span>
            <button
              className={`profile__edit-button ${isEditClicked && 'profile__edit-button_hidden'}`}
              type='button'
              onClick={handleEditClick}
            >
              Редактировать
            </button>
            <button
              className={`profile__logout ${isEditClicked && 'profile__logout_hidden'}`}
              type='button'
              onClick={handleLogout}
            >
              Выйти из аккаунта
            </button>
            <button
              className={`profile__save-button
                                        ${(!isEditClicked || isSaveClicked) && 'profile__save-button_hidden'}
                                        ${!isValid && 'profile__save-button_disabled'}`}
              type='submit'
              disabled={!isValid}
            >
              Сохранить
            </button>
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default Profile;
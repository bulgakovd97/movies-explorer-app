import Logo from '../Logo/Logo';
import ProfileForm from '../ProfileForm/ProfileForm';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useForm';

const Register = ({ onRegister, showError, errorMessage, isSending }) => {
  const { values, errors, isValid, handleInputChange } = useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onRegister(values);
  };

  return (
    <section className='register'>
      <div className='register__container'>
        <Logo />

        <h2 className='register__greeting'>
          Добро пожаловать!
        </h2>

        <ProfileForm
          name='register'
          label='Регистрация'
          onSubmit={handleSubmit}
        >
          <label className='profile-form__label profile-form__label_type_name' htmlFor='name-input'>
            Имя
          </label>
          <input
            className='profile-form__input profile-form__input_type_name'
            id='name-input'
            type='text'
            name='name'
            value={values.name || ''}
            placeholder='Введите имя'
            required
            minLength='2'
            maxLength='30'
            onChange={handleInputChange}
            disabled={isSending}
          />
          <span className={`profile-form__error ${!isValid && 'profile-form__error_visible'}`}>
            {errors.name || ''}
          </span>
          <label className='profile-form__label profile-form__label_type_email' htmlFor='email-input'>
            E-mail
          </label>
          <input
            className='profile-form__input profile-form__input_type_email'
            id='email-input'
            type='email'
            name='email'
            value={values.email || ''}
            placeholder='Введите Email'
            required
            minLength='2'
            maxLength='30'
            onChange={handleInputChange}
            disabled={isSending}
          />
          <span className={`profile-form__error ${!isValid && 'profile-form__error_visible'}`}>
            {errors.email || ''}
          </span>
          <label className='profile-form__label profile-form__label_type_password' htmlFor='password-input'>
            Пароль
          </label>
          <input
            className='profile-form__input profile-form__input_type_password'
            id='password-input'
            type='password'
            name='password'
            value={values.password || ''}
            placeholder='Введите пароль'
            required
            minLength='8'
            maxLength='20'
            onChange={handleInputChange}
            disabled={isSending}
          />
          <span className={`profile-form__error ${!isValid && 'profile-form__error_visible'}`}>
            {errors.password || ''}
          </span>
          <span className={`register__error ${showError && 'register__error_visible'}`}>
            {errorMessage}
          </span>
          <button
            className={`profile-form__button ${(!isValid || isSending) && 'profile-form__button_disabled'}`}
            type='submit'
            disabled={!isValid || isSending}
          >
            Зарегистрироваться
          </button>
          <div className='profile-form__caption'>
            <p className='profile-form__caption-text'>
              Уже зарегистрированы?
            </p>
            <Link className='profile-form__caption-link' to='/signin'>
              Войти
            </Link>
          </div>
        </ProfileForm>
      </div>
    </section>
  );
};

export default Register;
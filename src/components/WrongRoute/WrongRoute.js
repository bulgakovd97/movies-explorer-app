import { useHistory } from 'react-router-dom';

const WrongRoute = () => {
  const history = useHistory();

  return (
    <section className='wrong-route'>
      <div className='wrong-route__wrapper'>
        <p className='wrong-route__error-code'>
          404
        </p>
        <p className='wrong-route__error-text'>
          Страница не найдена
        </p>
        <button className='wrong-route__button' onClick={() => history.goBack()}>
          Назад
        </button>
      </div>
    </section>
  );
};

export default WrongRoute;
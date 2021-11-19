const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer__description'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__columns'>
        <p className='footer__year'>
          © 2021
        </p>
        <nav className='footer__info'>
          <ul className='footer__list'>
            <li className='footer__list-item'>
              <a className='footer__link' href='https://practicum.yandex.ru/' target='_blank' rel='noreferrer'>
                Яндекс.Практикум
              </a>
            </li>
            <li className='footer__list-item'>
              <a className='footer__link' href='https://github.com/yandex-praktikum/' target='_blank' rel='noreferrer'>
                Github
              </a>
            </li>
            <li className='footer__list-item'>
              <a className='footer__link' href='https://vk.com/yandex.practicum' target='_blank' rel='noreferrer'>
                ВКонтакте
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
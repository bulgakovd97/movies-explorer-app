const Portfolio = () => {
  return (
    <div className='portfolio'>
      <h3 className='portfolio__heading'>
        Портфолио
      </h3>
      <ul className='portfolio__projects'>
        <li className='portfolio__project'>
          <p className='portfolio__project-title'>
            Статичный сайт
          </p>
          <a className='portfolio__project-link' href='https://bulgakovd97.github.io/how-to-learn/index.html' target='_blank' rel='noreferrer'>
            <div className='portfolio__project-arrow'>
            </div>
          </a>
        </li>
        <li className='portfolio__project'>
          <p className='portfolio__project-title'>
            Адаптивный сайт
          </p>
          <a className='portfolio__project-link' href='https://bulgakovd97.github.io/russian-travel/index.html' target='_blank' rel='noreferrer'>
            <div className='portfolio__project-arrow'>
            </div>
          </a>
        </li>
        <li className='portfolio__project'>
          <p className='portfolio__project-title'>
            Одностраничное приложение
          </p>
          <a className='portfolio__project-link' href='https://mesto.bulgakovd.nomoredomains.rocks/' target='_blank' rel='noreferrer'>
            <div className='portfolio__project-arrow'>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Portfolio;
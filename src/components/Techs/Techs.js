import SectionTitle from '../SectionTitle/SectionTitle';

const Techs = ({ myRef }) => {
  return (
    <section className='techs' ref={myRef}>
      <SectionTitle title='Технологии' />

      <h3 className='techs__heading'>
        7 технологий
      </h3>
      <p className='techs__text'>
        На курсе веб-разработки мы освоили технологии,
        которые применили в дипломном проекте.
      </p>
      <ul className='techs__list'>
        <li className='techs__list-item'>
          <div className='techs__tech'>
            HTML
          </div>
        </li>
        <li className='techs__list-item'>
          <div className='techs__tech'>
            CSS
          </div>
        </li>
        <li className='techs__list-item'>
          <div className='techs__tech'>
            JS
          </div>
        </li>
        <li className='techs__list-item'>
          <div className='techs__tech'>
            React
          </div>
        </li>
        <li className='techs__list-item'>
          <div className='techs__tech'>
            Git
          </div>
        </li>
        <li className='techs__list-item'>
          <div className='techs__tech'>
            Express.js
          </div>
        </li>
        <li className='techs__list-item'>
          <div className='techs__tech'>
            mongoDB
          </div>
        </li>
      </ul>

    </section>
  );
};

export default Techs;
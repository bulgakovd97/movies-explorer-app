import Portfolio from '../Portfolio/Portfolio';
import SectionTitle from '../SectionTitle/SectionTitle';

const AboutMe = ({ myRef }) => {
  return (
    <section className='about-me' ref={myRef} >
      <SectionTitle title='Студент' />

      <div className='about-me__info'>
        <div className='about-me__description'>
          <p className='about-me__name'>
            Денис
          </p>
          <p className='about-me__job-age'>
            Фронтенд-разработчик, 24 года
          </p>
          <p className='about-me__about'>
            Я родился и живу в Санкт-Петербурге, закончил строительный факультет петербургского Политеха.
            Люблю кино, музыку и подкасты, а ещё катаюсь на велике и доске и пою под гитару.
            Недавно начал кодить. Закончу курс по веб-разработке от Яндекс Практикума и вперёд искать новую интересную работу!
          </p>
          <ul className='about-me__links'>
            <li>
              <a className='about-me__link' href='https://vk.com/bulgakovdi' target='_blank' rel='noreferrer'>
                ВКонтакте
              </a>
            </li>
            <li>
              <a className='about-me__link' href='https://github.com/bulgakovd97' target='_blank' rel='noreferrer'>
                Github
              </a>
            </li>
          </ul>
        </div>
        <div className='about-me__photo'>
        </div>
      </div>

      <Portfolio />
    </section>
  );
};

export default AboutMe;
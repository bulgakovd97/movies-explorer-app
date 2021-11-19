import SectionTitle from '../SectionTitle/SectionTitle';

const AboutProject = ({ myRef }) => {
  return (
    <section className='about-project' ref={myRef}>
      <SectionTitle title='О проекте' />

      <div className='about-project__description'>
        <p className='about-project__text about-project__text_type_1'>
          Дипломный проект включал 5 этапов
        </p>
        <p className='about-project__text about-project__text_type_2'>
          На выполнение диплома ушло 5 недель
        </p>
        <p className='about-project__sub-text about-project__sub-text_type_1'>
          Составление плана, работу над бэкендом, вёрстку,
          добавление функциональности и финальные доработки.
        </p>
        <p className='about-project__sub-text about-project__sub-text_type_2'>
          У каждого этапа был мягкий и жёсткий дедлайн,
          которые нужно было соблюдать, чтобы успешно защититься.
        </p>
      </div>

      <div className='about-project__stage'>
        <p className='about-project__weeks'>
          1 неделя
        </p>
        <p className='about-project__weeks'>
          4 недели
        </p>
        <p className='about-project__tech'>
          Back-end
        </p>
        <p className='about-project__tech'>
          Front-end
        </p>
      </div>
    </section>
  );
};

export default AboutProject;
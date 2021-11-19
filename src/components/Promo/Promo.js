import NavTab from '../NavTab/NavTab';

const Promo = ({ projectRef, techsRef, studentRef }) => {
  const scrollTo = (element) => {
    element.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className='promo'>
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <NavTab
        projectRef={projectRef}
        techsRef={techsRef}
        studentRef={studentRef}
        scrollTo={scrollTo}
      />
    </section>
  );
};

export default Promo;
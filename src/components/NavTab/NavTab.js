const NavTab = ({ projectRef, techsRef, studentRef, scrollTo }) => {
  return (
    <div className='nav-tab'>
      <ul className='nav-tab__list'>
        <li className='nav-tab__list-item'>
          <button
            className='nav-tab__button'
            type='button'
            onClick={() => scrollTo(projectRef.current)}
          >
            О проекте
          </button>
        </li>
        <li className='nav-tab__list-item'>
          <button
            className='nav-tab__button'
            type='button'
            onClick={() => scrollTo(techsRef.current)}
          >
            Технологии
          </button>
        </li>
        <li className='nav-tab__list-item'>
          <button
            className='nav-tab__button'
            type='button'
            onClick={() => scrollTo(studentRef.current)}
          >
            Студент
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavTab;
import { useRef } from 'react';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';


const Main = () => {
  const projectRef = useRef(null);
  const techsRef = useRef(null);
  const studentRef = useRef(null);

  return (
    <main className='content'>
      <Promo
        projectRef={projectRef}
        techsRef={techsRef}
        studentRef={studentRef}
      />

      <div className='container'>
        <AboutProject myRef={projectRef} />
      </div>

      <Techs myRef={techsRef} />

      <div className='container'>
        <AboutMe myRef={studentRef} />
      </div>
    </main>
  );
};

export default Main;
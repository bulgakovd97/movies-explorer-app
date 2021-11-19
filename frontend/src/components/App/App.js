import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import WrongRoute from '../WrongRoute/WrongRoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Tooltip from '../Tooltip/Tooltip';
import { ERROR_MESSAGES } from '../../utils/errorMessage';
import { MOVIES_URL } from '../../utils/config';


const App = () => {

  const [currentUser, setCurrentUser] = useState({});

  const [isChecking, setIsChecking] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isMoviesLoading, setIsMoviesLoading] = useState(true);

  const [isSavedMoviesLoading, setIsSavedMoviesLoading] = useState(true);

  const [isFirstRequest, setIsFirstRequest] = useState(true);

  const [movies, setMovies] = useState([]);

  const [savedMovies, setSavedMovies] = useState([]);

  const [showError, setShowError] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  const [checked, setChecked] = useState(false);

  const [isRequestSending, setIsRequestSending] = useState(false);

  const [isTooltipShow, setIsTooltipShow] = useState(false);

  const history = useHistory();

  const location = useLocation();

  const {
    USER_UPDATE,
    EMAIL_EXISTS,
    BAD_REQUEST,
    NO_AUTH,
    NOT_FOUND,
    NO_KEYWORD,
    SERVER_ERROR,
  } = ERROR_MESSAGES;

  const keyword = searchTerm.trim();

  const closeTooltip = () => {
    setIsTooltipShow(false);
  };

  const handleEscUp = (evt) => {
    if (evt.key === 'Escape') {
      closeTooltip();
    }
  };

  const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains("tooltip_opened")) {
      closeTooltip();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handleEscUp);
    document.addEventListener('click', handleOverlayClick);

    return () => {
      document.removeEventListener('keyup', handleEscUp)
      document.removeEventListener('click', handleOverlayClick);
    };
  }, []);

  // Посылаем запрос на получение массива всех фильмов
  const getAllMovies = () => {
    setIsMoviesLoading(false);

    return moviesApi
      .getBeatfilmMovies()
      .then(moviesData => {
        localStorage.setItem('movies', JSON.stringify(moviesData));

        return moviesData; // Возвращаем массив всех фильмов в случае упешного запроса на сервер
      })
      .catch(err => console.log('Ошибка загрузки фильмов с сервера - ' + err.status))
      .finally(() => setIsFirstRequest(false));
  };

  // Проверяем, найдены ли фильмы, и выводим ошибку, если нет
  const isMoviesFound = (movies) => {
    setShowError(false);
    setErrorMessage('');

    if (!movies || movies.length === 0) {
      setShowError(true);
      setErrorMessage(NOT_FOUND);
    }
  };

  // Общий фильтр фильмов: сначала по ключевому слову, затем по короткометражкам
  const filterMovies = (movies) => {
    const searchedMovies = movies.filter(movie => {
      if (movie.nameRU.toLowerCase().includes(keyword.toLowerCase())) {
        return movie;
      } else {
        return null;
      }
    });

    const filteredMovies = filterShortMovies(searchedMovies);

    isMoviesFound(filteredMovies);

    return filteredMovies; // Возвращаем массив отфильтрованных фильмов
  };

  // Фильтрация фильмов по корометражкам
  const filterShortMovies = (movies) => {
    if (movies) {
      const shortMovies = movies.filter(movie => {
        if (checked) {
          return movie.duration <= 40;
        } else {
          return movie;
        }
      });

      return shortMovies; // Возвращаем отфильтрованные по короткометражкам фильмы
    }
  };

  // Поиск фильмов и вывод найденных (роут '/movies')
  const searchMovies = () => {
    setIsMoviesLoading(false);
    setIsRequestSending(true);

    setShowError(false);
    setErrorMessage('');

    if (keyword) {
      if (isFirstRequest) {
        getAllMovies()
          .then((moviesData) => {
            const foundMovies = filterMovies(moviesData);

            localStorage.setItem('searched-movies', JSON.stringify(foundMovies));

            setMovies(foundMovies);
          })
          .catch(err => {
            setShowError(true);
            setErrorMessage(SERVER_ERROR);

            localStorage.setItem('movies', JSON.stringify([]));
            localStorage.setItem('searched-movies', JSON.stringify([]));
          })
          .finally(() => setIsRequestSending(false));
      } else {
        const allMovies = JSON.parse(localStorage.getItem('movies'));

        const foundMovies = filterMovies(allMovies);

        localStorage.setItem('searched-movies', JSON.stringify(foundMovies));

        setMovies(foundMovies);

        setIsRequestSending(false);
      }
    } else {
      setShowError(true);
      setErrorMessage(NO_KEYWORD);

      localStorage.setItem('searched-movies', JSON.stringify([]));
      setMovies([]);

      setIsRequestSending(false);
    }
  };

  // Поиск фильмов и вывод найденных (роут '/saved-movies')
  const searchSavedMovies = () => {
    setShowError(false);
    setErrorMessage('');

    if (keyword) {
      const allSavedMovies = JSON.parse(localStorage.getItem('saved-movies'));

      const foundSavedMovies = filterMovies(allSavedMovies);

      localStorage.setItem('searched-saved-movies', JSON.stringify(foundSavedMovies));

      setSavedMovies(foundSavedMovies);
    } else {
      setSavedMovies(JSON.parse(localStorage.getItem('saved-movies')));

      localStorage.setItem('searched-saved-movies', JSON.stringify([]));
    }
  };

  // Отображаем найденные отсортированные фильмы при перезагрузке страницы в зависимости от состояния чекбокса
  useEffect(() => {
    if (location.pathname === '/movies') {
      if (localStorage.getItem('searched-movies') !== null && localStorage.getItem('searched-movies') !== '[]') {
        setIsMoviesLoading(false);

        const filteredMovies = filterShortMovies(JSON.parse(localStorage.getItem('searched-movies')));

        isMoviesFound(filteredMovies);

        setMovies(filteredMovies);
      } else {
        if (keyword) {
          setShowError(true);
          setErrorMessage(NOT_FOUND);
        } else {
          setShowError(true);
          setErrorMessage(NO_KEYWORD);
        }
      }
    } else if (location.pathname === '/saved-movies') {
      if (keyword) {
        const filteredSearchedSavedMovies = filterShortMovies(JSON.parse(localStorage.getItem('searched-saved-movies')));

        isMoviesFound(filteredSearchedSavedMovies);

        setSavedMovies(filteredSearchedSavedMovies);
      } else {
        const filteredSavedMovies = filterShortMovies(JSON.parse(localStorage.getItem('saved-movies')));

        isMoviesFound(filteredSavedMovies);

        setSavedMovies(filteredSavedMovies);
      }
    }
  }, [checked, location.pathname]);

  // Получение сохранённых фильмов
  const getSavedMovies = () => {
    return mainApi
      .getMovies()
      .then(savedMoviesData => {
        setSavedMovies(savedMoviesData);
        localStorage.setItem('saved-movies', JSON.stringify(savedMoviesData));
      })
      .catch(err => console.log('Ошибка загрузки сохранённых фильмов - ' + err.status))
      .finally(() => setIsSavedMoviesLoading(false));
  };

  // Отображение сохранённых фильмов
  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      getSavedMovies();
    } else if (location.pathname === '/movies') {
      setSavedMovies(JSON.parse(localStorage.getItem('saved-movies')));
    }
  }, [location.pathname]);

  // Проверяем, сохранён ли фильм
  const checkIsMovieSaved = (movie) => {
    const isMovieSaved = savedMovies.some(savedMovie => savedMovie.id === movie.id);

    return isMovieSaved;
  };

  // Сохранение фильм по лайку
  const onSaveMovie = (movie) => {
    setIsRequestSending(true);

    return mainApi
      .saveMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: MOVIES_URL + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: MOVIES_URL + movie.image.formats.thumbnail.url,
        id: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
      .then(savedMovie => {
        setSavedMovies([...savedMovies, savedMovie]);
        localStorage.setItem('saved-movies', JSON.stringify([...savedMovies, savedMovie]));
      })
      .catch(err => {
        setIsTooltipShow(true);
        console.log('Ошибка сохранения фильма - ' + err.status);
      })
      .finally(() => setIsRequestSending(false));
  };

  // Удаление фильма из сохранённых по дизлайку или крестику
  const onDeleteMovie = (movie) => {
    setIsRequestSending(true);

    return mainApi
      .deleteMovie(movie.id)
      .then(() => {
        const updatedSavedMovies = savedMovies.filter(savedMovie => movie.id !== savedMovie.id);
        setSavedMovies(updatedSavedMovies);
        localStorage.setItem('saved-movies', JSON.stringify(updatedSavedMovies));
      })
      .catch(err => console.log('Ошибка удаления фильма - ' + err.status))
      .finally(() => setIsRequestSending(false));
  };

  // Сохранение/удаление фильма
  const handleMovieLike = (movie) => {
    const isSaved = checkIsMovieSaved(movie);

    if (!isSaved) {
      onSaveMovie(movie);
    } else {
      onDeleteMovie(movie);
    }
  };

  const getUser = (token) => {
    return mainApi
      .getUser(token)
      .then(userData => {
        setCurrentUser(userData);
      })
      .catch(err => console.log('Ошибка загрузки данных пользователя - ' + err.status));
  };

  const updateUser = ({ name, email }) => {
    setIsRequestSending(true);

    return mainApi
      .updateUser({ name, email })
      .then(userData => {
        setCurrentUser(userData);

        setShowError(false);
        setErrorMessage('');
      })
      .catch(err => {
        console.log('Ошибка обновления данных пользователя - ' + err.status);
        setShowError(true);
        setErrorMessage(USER_UPDATE);
      })
      .finally(() => setIsRequestSending(false));
  };

  const login = ({ email, password }) => {
    setIsRequestSending(true);

    return mainApi
      .authorize({ email, password })
      .then(({ token }) => {
        if (token) {
          localStorage.setItem('jwt', token);
          history.push('/movies');
          setIsLoggedIn(true);

          setShowError(false);
          setErrorMessage(false);

          getUser(token);
        }
      })
      .catch((err) => {
        console.log('Ошибка авторизации - ' + err.status);

        if (err.status === 401) {
          setShowError(true);
          setErrorMessage(NO_AUTH);
        } else {
          setShowError(true);
          setErrorMessage(BAD_REQUEST);
        }
      })
      .finally(() => {
        setIsChecking(false);
        setIsRequestSending(false);
      });
  };

  const register = ({ name, email, password }) => {
    setIsRequestSending(true);

    return mainApi
      .register({ name, email, password })
      .then(() => {
        login({ email, password });

        setShowError(false);
        setErrorMessage('');
      })
      .catch(err => {
        console.log('Ошибка регистрации - ' + err.status);

        if (err.status === 409) {
          setShowError(true);
          setErrorMessage(EMAIL_EXISTS);
        } else {
          setShowError(true);
          setErrorMessage(BAD_REQUEST);
        }
      })
      .finally(() => setIsRequestSending(false));
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.setItem('searched-movies', JSON.stringify([]));
    localStorage.removeItem('searched-saved-movies');
    localStorage.setItem('movies', JSON.stringify([]));
    setIsLoggedIn(false);
    setIsMoviesLoading(true);
    setIsSavedMoviesLoading(true);
    setIsFirstRequest(true);
    history.push('/');
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
      setIsChecking(false);
    } else {
      getUser(jwt);

      return mainApi
        .getUser(jwt)
        .then(data => {
          return data;
        })
        .then(({ name, email }) => {
          setCurrentUser({ name, email });
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log('Срок действия токена истёк - ' + err.status);

          logout();
        })
        .finally(() => setIsChecking(false));
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    setShowError(false);
    setErrorMessage('');
  }, [location.pathname]);

  useEffect(() => {
    if (isLoggedIn && (location.pathname === '/signin' || location.pathname === '/signup')) {
      history.push('/');
    }
  }, [isLoggedIn, history, location.pathname]);


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>

        <Switch>
          <Route exact path='/'>
            <Header isLoggedIn={isLoggedIn} />

            <Main />

            <Footer />
          </Route>

          <Route path='/signup'>
            <Register
              onRegister={register}
              showError={showError}
              errorMessage={errorMessage}
              isSending={isRequestSending}
            />
          </Route>

          <Route path='/signin'>
            <Login
              onLogin={login}
              showError={showError}
              errorMessage={errorMessage}
              isSending={isRequestSending}
            />
          </Route>

          <ProtectedRoute
            path='/profile'
            component={Profile}
            isLoggedIn={isLoggedIn}
            onUpdateUser={updateUser}
            showError={showError}
            errorMessage={errorMessage}
            isChecking={isChecking}
            isSending={isRequestSending}
            onLogout={logout}
          />

          <ProtectedRoute
            path='/movies'
            component={Movies}
            isLoggedIn={isLoggedIn}
            showError={showError}
            errorMessage={errorMessage}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            checked={checked}
            setChecked={setChecked}
            isChecking={isChecking}
            movies={movies}
            isMoviesLoading={isMoviesLoading}
            onSearch={searchMovies}
            isSending={isRequestSending}
            onMovieLike={handleMovieLike}
            savedMovies={savedMovies}
            checkIsMovieSaved={checkIsMovieSaved}
          />

          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            isLoggedIn={isLoggedIn}
            showError={showError}
            errorMessage={errorMessage}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            checked={checked}
            setChecked={setChecked}
            isChecking={isChecking}
            savedMovies={savedMovies}
            isSavedMoviesLoading={isSavedMoviesLoading}
            setSavedMovies={setSavedMovies}
            isSending={isRequestSending}
            onMovieLike={handleMovieLike}
            onSavedSearch={searchSavedMovies}
            checkIsMovieSaved={checkIsMovieSaved}
          />

          <Route path='*'>
            <WrongRoute />
          </Route>
        </Switch>

        <Tooltip isTooltipShow={isTooltipShow} onClose={closeTooltip} />

      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchForm = ({
        onSearch,
        onSavedSearch,
        searchTerm,
        setSearchTerm,
        checked,
        setChecked,
        isSending
      }) => {

    const location = useLocation();

    const handleCheckboxChange = (evt) => {
        setChecked(!checked);
    };

    const handleInputChange = (evt) => {
        setSearchTerm(evt.target.value);
    };

    const handleSearchSubmit = (evt) => {
        evt.preventDefault();

        if (location.pathname === '/movies') {
            onSearch();
        } else if (location.pathname === '/saved-movies') {
            onSavedSearch();
        } else {
            return;
        }
    };

    useEffect(() => {
        setSearchTerm('');
        setChecked(false);
    }, [location.pathname]);


    return (
        <section className='search'>
            <form className='search-form' name='search-form' onSubmit={handleSearchSubmit}>
                <fieldset className='search-form__fieldset'>
                    <input
                        className='search-form__input'
                        type='text'
                        name='movies'
                        value={searchTerm}
                        placeholder='Фильм'
                        maxLength='30'
                        onChange={handleInputChange}
                        disabled={isSending}
                    />
                    <button
                      className={`search-form__button ${isSending && 'search-form__button_disabled'}`}
                      type='submit'
                      disabled={isSending}
                    />
                </fieldset>
                <div className='search-form__short-wrapper'>
                    <label className='search-form__short-label'>
                        Короткометражки
                        <input
                          className='search-form__short-input'
                          type='checkbox'
                          value='short'
                          checked={checked}
                          onChange={handleCheckboxChange}
                          disabled={isSending}
                        />
                        <span className='search-form__fake-input'></span>
                    </label>
                </div>
            </form>
        </section>
    );
};

export default SearchForm;
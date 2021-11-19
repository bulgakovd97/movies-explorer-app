const Tooltip = ({ isTooltipShow, onClose }) => {
  return (
    <section className={`tooltip ${isTooltipShow && 'tooltip_opened'}`}>
      <div className='tooltip__container'>
        <p className='tooltip__text'>
          Невозможно сохранить фильм :(
        </p>
        <button className='tooltip__close-button' type='button' aria-label='Закрыть' onClick={onClose} />
      </div>
    </section>
  )
};

export default Tooltip;
const SubmitError = ({ showError, errorMessage }) => {
  return (
    <span className={`submit-error ${showError && 'submit-error_visible'}`}>
      {errorMessage}
    </span>
  );
};

export default SubmitError;
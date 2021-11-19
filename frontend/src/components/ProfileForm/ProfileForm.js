const ProfileForm = ({ name, onSubmit, children }) => {
  return (
    <form className='profile-form' name={`${name}-form`} onSubmit={onSubmit}>
      <fieldset className='profile-form__fieldset'>
        {children}
      </fieldset>
    </form>
  );
};

export default ProfileForm;
import "../images/logo.png"

const Nav = ({ authToken, minimal, setShowModal, showModal, setIsSignUp, setShowModalCompanies, setIsSignUpCompanies, authTokenCompanies }) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };
  const handleClickCompanies = () => {
    setShowModalCompanies(true);
    setIsSignUpCompanies(false);
  };

  return (
    <nav>
      <div className="logo-container">
        <img
          className="logo"
          src = "logo.png"
          alt="logo"
        />
      </div>
      {!authToken && !minimal && (
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}
        >
          Log in
        </button>
      )}
    </nav>
  );
};
export default Nav;

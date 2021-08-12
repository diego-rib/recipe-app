import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './Styles/Profile.css';
import perfilbg from './perfilbg.mp4';

function Profile() {
  const history = useHistory();
  /* const [userEmailProfile, setUserEmailProfile] = useState('');
  const { userEmail } = useContext(UserContext);

  useEffect(() => {
    const userEmailStorageString = JSON.parse(localStorage.getItem('user'));
    if (userEmailStorageString === null) setUserEmailProfile(userEmail);
    else setUserEmailProfile(userEmailStorageString.email);
    setHideSearchBtn(false);
    setPageName('Perfil');
    }, []);

  const clearStorage = () => localStorage.clear();
    */
  return (
    <div>
      <video
        width="360"
        height="640"
        playsinline
        autoPlay
        muted
        loop
        className="bgVideo"
      >
        <source src={ perfilbg } type="video/mp4" />
      </video>
      <Header title="Perfil" />
      <div className="perfilpage">
        <main className="main-profile">
          <section className="profile-section">
            <p data-testid="profile-email">userEmailProfile</p>
            <Button
              type="button"
              onClick={ () => history.push('/receitas-feitas') }
              data-testid="profile-done-btn"
              className="button-one"
              variant="outline-success"
            >
              Receitas Feitas
            </Button>
            <Button
              type="button"
              onClick={ () => history.push('/receitas-favoritas') }
              data-testid="profile-favorite-btn"
              className="button-two"
              variant="outline-dark"
            >
              Receitas Favoritas
            </Button>
            <Button
              type="button"
              onClick={ () => history.push('/') }
              data-testid="profile-logout-btn"
              className="button-three"
              variant="outline-danger"
            >
              Sair
            </Button>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
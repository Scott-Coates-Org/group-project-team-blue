import Logo from 'components/logo/Logo';
import { Button } from 'reactstrap';

const Home = () => {
  return (
    <div className="w-100 h-100 vh-100 d-flex justify-content-center align-items-center homepage-bg">
      <div>
        <Logo />
        <div className="d-flex justify-content-center">
          <div id="homepage-btn">Buy a Pass</div>
        </div>
      </div>
    </div>
  );
};

export default Home;

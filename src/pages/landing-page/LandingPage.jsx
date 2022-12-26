import { useContext } from 'react';
import { MapLoadedContext } from 'src/context';
import { StyledContainer } from './LandingPage.styles';

const LandingPage = () => {
  const isMapLoaded = useContext(MapLoadedContext);

  console.log('## isMapLoaded: ', isMapLoaded);

  return (
    <StyledContainer className="foo">
      {/* <div className="header-ctn animated slideInDown fast"> */}
      {/*  <h1 className="header">NAVIGO</h1> */}
      {/* </div> */}
      {/* <div className="hero-content"> */}
      {/*  <div className="hero-content-main"> */}
      {/*    Your Personal Navigator */}
      {/*    <i className="fas fa-route" /> */}
      {/*  </div> */}
      {/*  <div className="hero-content-sub"> */}
      {/*    <div className="hero-content-sub-img animated rotateIn faster" /> */}
      {/*    <span className="hero-content-sub-info">TO PLACES AROUND YOU</span> */}
      {/*  </div> */}
      {/* </div> */}
      {/* <div className="address-ctn"> */}
      {/*  <input type="text" className="address-input" placeholder="Search city" /> */}
      {/*  <button type="button" className="zoom-btn"> */}
      {/*    <i className="fas fa-search" /> */}
      {/*  </button> */}
      {/* </div> */}
      {/* <div className="footer"> */}
      {/*  Crafted with <i className="fas fa-heart" /> by Fateh */}
      {/* </div> */}
    </StyledContainer>
  );
};

export default LandingPage;

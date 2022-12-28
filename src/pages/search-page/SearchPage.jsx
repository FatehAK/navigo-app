import { useLocation } from 'react-router-dom';
import { searchPage } from './SearchPage.styles';

const SearchPage = () => {
  const { state: initialLatLng } = useLocation();

  console.log('## the latlng ', initialLatLng);

  return <div className={searchPage}>Search Page</div>;
};

export default SearchPage;

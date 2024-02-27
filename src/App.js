
import './App.css';
import './public/css/style.scss'
import './public/css/Slider.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactjs-popup/dist/index.css';

import ShowCategoryMovie from './components/CategoryMovie';
import MovieSlider from './components/Slider';
import Navbar from './components/Navbar';




const App = () => {
  return (
    <>
      <Navbar/>
      <MovieSlider/>
      <ShowCategoryMovie/>
    </>

  )
  
}

export default App;

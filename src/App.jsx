import { Fragment } from 'react';
import 'swiper/scss';
import Main from './components/layout/Main';
import HomePage from './pages/HomePage';
import Banner from './components/banner/Banner'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MoviePage from './pages/MoviePage';
import MovieDetail from './pages/MovieDetail';


function App() {

  return (
    <Fragment>
      <Router>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path='/'
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }></Route>

            <Route path='/movies' element={<MoviePage></MoviePage>}></Route>
            <Route path='/movie/:movieId' element={<MovieDetail></MovieDetail>}></Route>
          </Route>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App

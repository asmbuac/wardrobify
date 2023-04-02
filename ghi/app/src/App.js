import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoeIndex from './ShoeIndex';
import ShoeForm from './ShoeForm';
import HatsList from './HatsList';
import HatsForm from './HatForm';

function App(props) {
  if (props.shoes === undefined || props.hats === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="shoes" element={<ShoeIndex shoes={props.shoes} />} >
          <Route path="new" element={<ShoeForm />} />
        </Route>
        <Route path="hats">
          <Route index element={<HatsList hats={props.hats} />} />
          <Route path="new" element={<HatsForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

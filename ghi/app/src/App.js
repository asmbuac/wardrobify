import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList';
import ShoeForm from './ShoeForm';
import HatsList from './HatsList';
import HatsForm from './HatForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="shoes">
          <Route index element={<ShoesList />} />
          <Route path="new" element={<ShoeForm />} />
        </Route>
        <Route path="hats">
          <Route index element={<HatsList />} />
          <Route path="new" element={<HatsForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

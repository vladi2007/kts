import './App.module.scss'
import Header from '../components/Header';
import { Outlet } from 'react-router';

function App() {

  return (
    <>
   
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
}

export default App;

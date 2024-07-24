import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import CategoryList from './components/Checkout/checkout';
import Routes from './Routes';


function App() {
  return (
    <div className="App">
      <Routes />
      {/* <CategoryList /> */}
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Product_card from './components/Product_component/Product_card';
import Main_page from './pages/Main_page/main';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Header />
      <Main_page />
    </div>
  );
}

export default App;

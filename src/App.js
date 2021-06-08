import './App.css';
import Button from './component/Button/Button';
import Todo from './component/Todo/Todo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button label="Click me please"></Button>
        <div>learn react</div>
        <Todo/>
      </header>
    </div>
  );
}

export default App;

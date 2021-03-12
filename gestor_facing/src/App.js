import './App.css';
import Canvas from './components/Canvas';

function App() {
  return (
    <div className="App">
      <Canvas
        onClick={() => console.log('onclick')}
        emotion={"Sad"}
      />
    </div>
  );
}

export default App;

import './App.css';
import PalattePlayground from './pages/PalettePlayground/PalattePlayGround';
import { Provider } from "react-redux";
import store from './store/index';

function App() {
  return (
    <div >
      <Provider store={store}>
        <PalattePlayground />
      </Provider>
    </div>
  );
}

export default App;

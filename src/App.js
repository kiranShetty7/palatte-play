import './App.css';
import PalattePlayground from './pages/PalettePlayground/PalattePlayGround';
import { Provider } from "react-redux";
import store from './store/index';
import RouterConfig from './router/RouterConfig';

function App() {
  return (
    <div >
      <Provider store={store}>
        <RouterConfig />
      </Provider>
    </div>
  );
}

export default App;

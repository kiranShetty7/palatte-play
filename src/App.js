import './App.css';
import PalattePlayground from './pages/PalettePlayground/PalattePlayGround';
import { Provider } from "react-redux";
import store from './store/index';
import RouterConfig from './router/RouterConfig';
import SnackBar from './components/SnackBar/SnackBar'
import Loader from './components/Loader/Loader'

function App() {
  return (
    <div >
      <Provider store={store}>
        <Loader />
        <RouterConfig />
        <SnackBar />
      </Provider>
    </div>
  );
}

export default App;

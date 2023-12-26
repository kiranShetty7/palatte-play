import './App.css';
import PalattePlayground from './pages/PalettePlayground/PalattePlayGround';
import { Provider } from "react-redux";
import store from './store/index';
import AuthLayout from './pages/AuthLayout/AuthLayout';
import PaletteGallery from './pages/PaletteGallery/PaletteGallery';
import DrawingBoard from './components/DrawingBoard/DrawingBoard';
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

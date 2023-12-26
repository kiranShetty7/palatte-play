import './App.css';
import PalattePlayground from './pages/PalettePlayground/PalattePlayGround';
import { Provider } from "react-redux";
import store from './store/index';
import AuthLayout from './pages/AuthLayout/AuthLayout';
import PaletteGallery from './pages/PaletteGallery/PaletteGallery';

function App() {
  return (
    <div >
      <Provider store={store}>
        {/* <AuthLayout /> */}
        <PalattePlayground />
        {/* <PaletteGallery /> */}
      </Provider>
    </div>
  );
}

export default App;

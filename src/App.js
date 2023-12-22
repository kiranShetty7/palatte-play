import './App.css';
import PalattePlayground from './pages/PalettePlayground/PalattePlayGround';
import { Provider } from "react-redux";
import store from './store/index';
import AuthLayout from './pages/AuthLayout/AuthLayout';

function App() {
  return (
    <div >
      <Provider store={store}>
        <AuthLayout />
        {/* <PalattePlayground /> */}
      </Provider>
    </div>
  );
}

export default App;

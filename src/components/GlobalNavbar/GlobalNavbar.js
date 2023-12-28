import * as React from 'react';
import classes from './GlobalNavBar.module.css'
import LOGO from '../../assets/palatteplayLogo.png'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router';
import { useDispatch } from "react-redux";
import { updateAppLoader } from '../../store/LoaderSlice';

const GlobalNavbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    dispatch(
      updateAppLoader({
        loading: true
      })
    )
    setTimeout(() => {
      localStorage.clear()
      navigate('/')
      dispatch(
        updateAppLoader({
          loading: false
        })
      )
    }, 1000)
  }

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.logoContainer}>  <img src={LOGO} className={classes.logo}></img><span className={classes.text}>Palette - play</span></div>
        <div className={classes.logoutContainer} onClick={handleLogout}>
          <LogoutIcon /> Logout
        </div>
      </div>
    </div>)
}

export default GlobalNavbar
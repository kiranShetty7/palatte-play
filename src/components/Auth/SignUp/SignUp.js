import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import classes from './SignUp.module.css'
import { SignUpOperation } from '../../../services/apiHandler';
import { updateSnackBar } from '../../../store/SnackBarSlice';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";

const SignUp = () => {
    const {
        handleSubmit,
        register,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState({
        password: false,
        confirmPassword: false,
    });
    const store = useSelector((state) => state)


    const handleClickShowPassword = (field) => () => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const onSubmit = async (data) => {
        const { password, confirmPassword } = data;

        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,})$/;

        if (!passwordRegex.test(password)) {
            setError('password', {
                type: 'custom',
                message: 'Password length should be at least 8 characters with 1 special character and 1 number',
            });
            return;
        }

        if (password !== confirmPassword) {
            setError('confirmPassword', {
                type: 'custom',
                message: 'Passwords do not match',
            });
            return;
        } else {
            clearErrors('confirmPassword');
        }

        const payload = {
            name: data.name,
            email: data.email,
            password: data.password,
            profilePic: localStorage.getItem('uploadProfileLink'),
        };

        try {
            const response = await SignUpOperation(payload)
            if (response?.data?.success) {
                localStorage.setItem('name', response?.data?.data?.name)
                localStorage.setItem('userId', response?.data?.data?.userId)
                localStorage.setItem('token', response?.data?.data?.token)
                localStorage.setItem('email', response?.data?.data?.email)

                navigate('/gallery')
            }
            else {
                dispatch(
                    updateSnackBar({
                        open: true,
                        severity: 'error',
                        message: 'Failed to SignUp'
                    })
                )
            }
        }
        catch (error) {
            dispatch(
                updateSnackBar({
                    open: true,
                    severity: 'error',
                    message: 'Something went wrong'
                })
            )
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.container}>
                    <TextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        {...register('name', { required: 'Name is required' })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        id="email"
                        label="Email id"
                        sx={{ width: '100%', m: 1 }}
                        className={errors.email ? 'error' : ''}
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+\.\S+/,
                                message: 'Invalid email address',
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={showPassword.password ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword('password')}
                                        edge="end"
                                    >
                                        {showPassword.password ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Conjure your secret code!"
                            {...register('password', {
                                required: 'Password is required',
                            })}
                            error={!!errors.password}
                        />
                        <span className={classes.error}>{errors.password && errors.password.message}</span>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            id="confirmPassword"
                            type={showPassword.confirmPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword('confirmPassword')}
                                        edge="end"
                                    >
                                        {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Validate Sorcery!"
                            {...register('confirmPassword', {
                                required: 'Confirm Password is required',
                            })}
                            error={!!errors.confirmPassword}
                        />
                        <span className={classes.error}>{errors.confirmPassword && errors.confirmPassword.message}</span>
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ width: '100%' }}
                        disabled={Object.keys(errors).length > 0}
                    >
                        Start Drawing !
                    </Button>
                </div>
            </form>
        </>
    );
};

export default SignUp;

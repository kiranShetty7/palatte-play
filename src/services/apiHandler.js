import {
    PALATTE_PLAY_BASE_URL,
    VERSION,
    USER,
    DRAWING,
    LOGIN,
    SIGN_UP,
    GET_ALL_DRAWINGS,
    CREATE_DRAWING,
    GET_INDIVIDUAL_DRAWING,
    SAVE_DRAWING,
    EDIT_NAME,
    DELETE
} from './CONSTANTS';
import axios from 'axios'
import history from "../router/CustomBrowserHistory";
import store from '../store/index'
import { updateSnackBar } from "../store/SnackBarSlice";

const instance = axios.create({})

instance.interceptors.request.use(
    (config) => {

        const userId = localStorage.getItem('userId')
        const authToken = localStorage.getItem('token');
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
            config.headers.userId = userId;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use((response) => {

    return Promise.resolve(response);
}, (error) => {
    if (error.response && error.response.status === 401) {
        history.replace("/");
        store.dispatch(updateSnackBar({
            open: true,
            severity: 'error',
            message: 'Unauthorized ! Please login to continue'
        }))
    }

});



export async function loginOperation(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const URL = PALATTE_PLAY_BASE_URL + VERSION + USER + LOGIN;
            const CONFIG = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await instance.post(URL, payload, CONFIG);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}

export async function SignUpOperation(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const URL = PALATTE_PLAY_BASE_URL + VERSION + USER + SIGN_UP;
            const CONFIG = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await instance.post(URL, payload, CONFIG);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}

export async function getAllDrawings() {
    return new Promise(async (resolve, reject) => {
        try {
            const URL = PALATTE_PLAY_BASE_URL + VERSION + DRAWING + GET_ALL_DRAWINGS;
            const CONFIG = {
                headers: {
                    'Content-Type': 'application/json',
                },

            };
            const response = await instance.get(URL, CONFIG);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}

export async function createNewDrawing(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const URL = PALATTE_PLAY_BASE_URL + VERSION + DRAWING + CREATE_DRAWING;
            const CONFIG = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await instance.post(URL, payload, CONFIG);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}

export async function editName(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const URL = PALATTE_PLAY_BASE_URL + VERSION + DRAWING + EDIT_NAME;
            const CONFIG = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await instance.post(URL, payload, CONFIG);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}

export async function getIndividualDrawing(drawingId) {
    return new Promise(async (resolve, reject) => {
        try {
            const URL = PALATTE_PLAY_BASE_URL + VERSION + DRAWING + GET_INDIVIDUAL_DRAWING + '/' + drawingId;;
            const CONFIG = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await instance.get(URL, CONFIG);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}

export async function saveDrawing(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const URL = PALATTE_PLAY_BASE_URL + VERSION + DRAWING + SAVE_DRAWING;
            const CONFIG = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await instance.post(URL, payload, CONFIG);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}

export async function deleteDrawing(drawingId) {
    return new Promise(async (resolve, reject) => {
        try {
            const URL = PALATTE_PLAY_BASE_URL + VERSION + DRAWING + DELETE + '/' + drawingId;;
            const CONFIG = {
                headers: {
                    'Content-Type': 'application/json',
                },


            };
            const response = await instance.get(URL, CONFIG);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}


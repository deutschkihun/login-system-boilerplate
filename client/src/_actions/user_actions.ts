import axios from "axios";
import {findEmail, findPassword, IFormInputs, loginFormInputs, resetPassword, setting} from '../interface';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    FORGOT_EMAIL_USER,
    FORGOT_PASSWORD_USER,
    RESET_PASSWORD_USER,
    SETTING_USER,
    CHANGE_USER
} from './types';

export const registerUser = async (dataToSubmit: IFormInputs) => {
    const request =  await axios.post("/api/v1/users/register", dataToSubmit)
        .then(response => {
            return response.data
        })

        return {
            type: REGISTER_USER,
            payload: request 
        }
} 

export const loginUser = async (dataToSubmit: loginFormInputs) => {
    const request = await axios.post("/api/v1/users/login", dataToSubmit)
        .then(response => {
            return response.data
        })

        return {
            type: LOGIN_USER,
            payload: request
        }
}

export const auth = async () => {
    const request:{isAuth:boolean} = await axios.get('/api/v1/auth')
    .then(response => response.data)
    
    return {
        type: AUTH_USER,
        payload: request
    }
}

export const forgotEmail = async (dataToSubmit: findEmail) => {
    const request = await axios.post('/api/v1/users/forgotemail',dataToSubmit)
        .then(response => response.data)

    return {
        type:FORGOT_EMAIL_USER,
        payload:request
    }
}

export const forgotPassword = async (dataToSubmit: findPassword) => {
    const request = await axios.post('/api/v1/users/forgotpassword',dataToSubmit)
        .then(response => response.data)

    return {
        type:FORGOT_PASSWORD_USER,
        payload:request
    }
}

export const resetPasswordUser = async(dataToSubmit: resetPassword) => {
    const request = await axios.post('/api/v1/users/resetpassword', dataToSubmit)
        .then(response => response.data)

    return {
        type:RESET_PASSWORD_USER,
        payload:request
    }
}

export const settingUser = async() => {
    const request:setting = await axios.get('/api/v1/auth/setting')
        .then(response => response.data)

    return {
        type:SETTING_USER,
        payload:request
    }
}


export const changeUser = async (dataToSubmit: IFormInputs) => {
    const request = await axios.patch('/api/v1/users/change',dataToSubmit)
        .then(response => response.data)

    return {
        type:CHANGE_USER,
        payload:request
    }
}

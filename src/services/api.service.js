// import { FundFilled } from "@ant-design/icons";
import axios from "./axios.customize";
// create user
const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    return axios.post(URL_BACKEND, data)
}
//update user
const updateUserAPI = (_id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        fullName: fullName,
        phone: phone
    }
    return axios.put(URL_BACKEND, data)
}
const deleteUserAPI = (id) => {
    const URL_BACKEND = `/api/v1/user/${id}`; //backtick
    return axios.delete(URL_BACKEND)
}
const handleUploadFile = (file, folder) => {
    const URL_BACKEND = "/api/v1/file/upload"; //backtick
    let config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data"
        }
    }
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file)
    return axios.post(URL_BACKEND, bodyFormData, config)
}
const UpdateUserAvatarAPI = (avatar, _id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        avatar: avatar,
        _id: _id,
        fullName: fullName,
        phone: phone
    }
    return axios.put(URL_BACKEND, data)
}
// register form
const registerUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user/register";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    return axios.post(URL_BACKEND, data)
}
const loginAPI = (email, password) => {
    const URL_BACKEND = "/api/v1/auth/login";
    const data = {
        username: email,
        password: password,
        delay: 2000,
    }
    return axios.post(URL_BACKEND, data)
}
const logoutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout";
    return axios.post(URL_BACKEND);
}
const getAccountAPI = () => {
    const URL_BACKEND = "/api/v1/auth/account";
    return axios.get(URL_BACKEND);
}
const fetchAllUserAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}
const fetchALLBookAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}
const deleteBookAPI = (id) => {
    const URL_BACKEND = `/api/v1/book/${id}`; //backtick
    return axios.delete(URL_BACKEND)
}
const UpdateBookAvatarAPI = (avatar, _id) => {
    const URL_BACKEND = "/api/v1/book";
    const data = {
        avatar: avatar,
        _id: _id
    }
    return axios.put(URL_BACKEND, data)
}
const CreateBookAPI = (thumbnail, mainText, author, price, quantity, category) => {
    const URL_BACKEND = "/api/v1/book";
    const data = {
        thumbnail: thumbnail,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category
    }
    return axios.post(URL_BACKEND, data)
}
const UpdateBookAPI = (_id, thumbnail, mainText, author, price, quantity, category) => {
    const URL_BACKEND = "/api/v1/book";
    const data = {
        _id: _id,
        thumbnail: thumbnail,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category
    }
    return axios.put(URL_BACKEND, data)
}

export {
    createUserAPI, updateUserAPI, fetchAllUserAPI, deleteUserAPI, handleUploadFile,
    UpdateUserAvatarAPI, registerUserAPI, loginAPI, getAccountAPI, logoutAPI, fetchALLBookAPI,
    deleteBookAPI, UpdateBookAvatarAPI, CreateBookAPI, UpdateBookAPI
};
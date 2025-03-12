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
    const URL_BACKEND = `/api/v1/file/upload`; //backtick
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
const fetchAllUserAPI = () => {
    const URL_BACKEND = "/api/v1/user";
    return axios.get(URL_BACKEND);
}
export { createUserAPI, updateUserAPI, fetchAllUserAPI, deleteUserAPI, handleUploadFile };
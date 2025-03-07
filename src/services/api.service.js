import axios from "axios";
// create user
const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "http://localhost:8080/api/v1/user";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    return axios.post(URL_BACKEND, data)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
}
//update user
const updateUserAPI = () => {

}
export { createUserAPI, updateUserAPI };
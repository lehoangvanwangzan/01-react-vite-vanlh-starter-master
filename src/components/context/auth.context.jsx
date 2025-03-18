import { createContext, useState } from "react";
const AuthContext = createContext({
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: ""
});
const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: ""
    })
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export { AuthContext, AuthWrapper }
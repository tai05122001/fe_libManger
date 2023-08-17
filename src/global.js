import { createContext , useState } from "react";

const GlobalContext = createContext();
function GlobalProvider({ children }) {
    const [email, setEmail] = useState("");
    const [accesstoken, setAccessToken] = useState("");
    const [refreshtoken, setRefreshToken] = useState("");
    const value = {
        email,
        accesstoken,
        refreshtoken,
        setEmail,
        setAccessToken,
        setRefreshToken
    };
    return (
        <GlobalContext.Provider value={value}>
            {children}
       </GlobalContext.Provider>
    )
}
export{GlobalContext, GlobalProvider}
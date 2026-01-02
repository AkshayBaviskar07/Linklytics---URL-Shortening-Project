import { createContext, useState, useContext } from 'react'

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  
  const getToken = localStorage.getItem("JWT_TOKEN");

    const [token, setToken] = useState(getToken || null);

    const sendData = {
      token, 
      setToken
    };

    return (
      <ContextApi.Provider value={sendData}>
        {children}
      </ContextApi.Provider>
    )
};

export const useStoreContext = () => {
  const context = useContext(ContextApi);
  return context;
}

export default ContextApi;

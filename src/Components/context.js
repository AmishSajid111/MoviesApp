import React, { useContext, useEffect, useState } from "react";
export const Api=`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();



// we are getting the children and that is app component in our case
const AppProvider = ({ children }) => {
  const [query, setQuery] = useState("hacker");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [movie, setMovie] = useState([]);
  const getMovie=async(url)=>
  {
    try{const res=await fetch(url);
    const data=await res.json();
    console.log(data);
    if(data.Response==="True"){
      setIsLoading(false);
      setIsError({
        show:false,
        msg:" ",
      });
      setMovie(data.Search);
    
    }else{
      setIsError({
        show:true,
        msg:data.Error,
      });
    } 
    }
    catch(error)
    {
      console.log(error);
    }
  };
  useEffect(()=>
  {
    const timerOut= setTimeout(()=>{
      getMovie(`${Api}&s=${query}`);
    },500);
    return ()=> clearTimeout(timerOut);
   

  },[query])
 
  return (
    <AppContext.Provider value={{ query, movie, setQuery, isLoading, isError }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };

import { NavLink, useParams } from "react-router-dom";
import { Api } from "./context";
import { useState,useEffect } from "react";

const Singlemovies = () => {
  const { id } = useParams();
  


  
  const [isLoading, setIsLoading,setIsError] = useState(true);
 
  const [movie, setMovie] = useState("");
  const getMovie=async(url)=>
  {
    setIsLoading(true);
    try{const res=await fetch(url);
    const data=await res.json();
    console.log(data);
    if(data.Response==="True"){
      setIsLoading(false);
    
      setMovie(data);
    
    } else{
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
      getMovie(`${Api}&i=${id}`);
    },8000);
    return ()=> clearTimeout(timerOut);
   

  },[id])
 
  if (isLoading) {
    return (
      <section className="movie-section ">
        <div className="loading">Loading....</div>;
      </section>
    );
  }

  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={movie.Poster} alt="" />
        </figure>
        <div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className=""></p>
          <p className="card-text">{movie.Released}</p>
          <p className="card-text">{movie.Genre}</p>
          <p className="card-text">{movie.imdbRating} / 10</p>
          <p className="card-text">{movie.Country}</p>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Singlemovies
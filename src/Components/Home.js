import Movies from "./movies";
import Search from "./Search";

export const Home = () => {
  return (
  
      <div className="container">
    
        <Search />
      <Movies/>
      </div>
   
  );
};

export default Home;
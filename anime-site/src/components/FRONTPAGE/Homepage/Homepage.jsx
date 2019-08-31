import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import "./Homepage.css"
const Homepage = () => {
   const  [anime,setAnime] = useState([]);

  useEffect(() => {axios('http://localhost:5500/homepage').then(res =>{
    setAnime(res.data); 
})
},[]);
console.log(anime);

    return (
      <div className="pageContent">
        <div className="content-container">
          <div className="home">
            <div className="latest-episodes">
            <div className="componentName">Latest Episodes</div>
              <div className="mostPopularCard">
                    {
                        anime.map( (res,idx) => {
                            if(idx!=4){
                            return (
                              <div className='flex'>
                                <div className="mediaCard">
                                <div className="img"><img src={res.image} alt={res.title}/>
                                </div>
                                
                                   <div className="mediaCardTitle">{res.title}
                                </div>
                            </div>
                            <div className="episode"> Episode {res.episode}
                                   </div>
                                   </div>
                            )
                            }
                        })
                    }
              </div> 
            </div>
          </div>
        </div>
      </div>
    );


}
export default Homepage;
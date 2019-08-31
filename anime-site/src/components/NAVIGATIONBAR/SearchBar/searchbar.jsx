import React,{ useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import axios from "axios";
import { PassThrough } from "stream";
const Searchbar = ()  =>  {


    const [search, setSearch] = useState("");
    const [anime, setAnime] = useState({video:[],cnt:0});
    const [ID,setID] = useState([]);
    useEffect(() => {
      if (search.length > 3)
      {
     axios(`http://localhost:5500/find/${search}`).then(({data}) => {setAnime(data)
    console.log({data})});     
}
    else setAnime({video:[],cnt:0});

     
    
    }, [search]);
 useEffect( () => {
     
     if(search.length >3)
     {
        setID([])
    anime.video.map(an => {
        axios(`https://kitsu.io/api/edge/anime/${an.id}/genres/`).then(response => { 
            // setID(response.data.data.map(el =>(el.attributes.name)))
            setID(oldID => [...oldID ,`${response.data.data.slice(0,5).map(el =>(` ${el.attributes.name}`))}`]);}
        )}); 
    }
    else setID([])
    },[anime.cnt])
    
     

    console.log(`ID este ${ID}`)
    const onSearch = event => {
      setSearch(event.target.value);
    };


    return(
        <div className="searchTab">
        <div className="form1">
        <form className="form">
          <button className="button" type="submit">
            <svg
              className="searchButton"
              version="1.1"
              id="Capa_1"
              fill="#020d18"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20px"
              height="20px"
              viewBox="0 0 485.213 485.213"
            >
              <path
                fill="#f3f3f3"
                d="M363.909,181.955C363.909,81.473,282.44,0,181.956,0C81.474,0,0.001,81.473,0.001,181.955s81.473,181.951,181.955,181.951
    C282.44,363.906,363.909,282.437,363.909,181.955z M181.956,318.416c-75.252,0-136.465-61.208-136.465-136.46
    c0-75.252,61.213-136.465,136.465-136.465c75.25,0,136.468,61.213,136.468,136.465
    C318.424,257.208,257.206,318.416,181.956,318.416z"
              />
              <path
                fill="#f3f3f3"
                d="M471.882,407.567L360.567,296.243c-16.586,25.795-38.536,47.734-64.331,64.321l111.324,111.324
    c17.772,17.768,46.587,17.768,64.321,0C489.654,454.149,489.654,425.334,471.882,407.567z"
              />
            </svg>
          </button>
          <input
            className="searchInput"
            type="text"
            onChange={onSearch}
          />
          <button className="resetSearch" onClick={async () => {setID([]);
             await setAnime({video:[],cnt:0})}} type="reset">
            <svg
              className="resetButton"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 14 15"
            >
              <g>
                <g>
                  <path
                    fill="#f3f3f3"
                    d="M11.335.7l2.705 2.756-3.966 3.894 4.066 4.141-2.771 2.721-4.066-4.141-3.966 3.894L.63 11.209l3.966-3.894L.86 3.51 3.63.788 7.37 4.594z"
                  />
                </g>
              </g>
            </svg>
          </button>
        </form>
          
          <div className="dropdown" style={{display:anime.cnt>0?"block":'none'}}>
            <div className="dropdownOverflow">
            { 

anime.cnt>0?anime.video.slice(0,1).map((el,idx) => (
<div className="animeSearchListBorder">
<img className="posterImage" src={el.attributes.posterImage.small} />
<div className="info">
<div className="title">{el.attributes.canonicalTitle}</div>
<div className="genres">{ID[0]}</div>
<div className="year">{el.attributes.startDate.slice(0,4)}</div>
</div>
</div>
)):0}
          { 

            anime.cnt>0?anime.video.slice(1,4).map((el,idx) => (
<div className="animeSearchList">
  <img className="posterImage" src={el.attributes.posterImage.small} />
  <div className="info">
  <div className="title">{el.attributes.canonicalTitle}</div>
  <div className="genres">{ID[idx]}</div>
  <div className="year">{el.attributes.startDate.slice(0,4)}</div>
  </div>
</div>
)):0}
{     
    anime.cnt>4 &&  <div className="listEveryAnime">     view all {anime.cnt-4}+ results.</div>
    
}
       </div>
          </div>
        </div>            
      </div>



    
    
    
        )}
export default Searchbar;

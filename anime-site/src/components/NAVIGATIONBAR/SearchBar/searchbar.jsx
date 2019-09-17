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
    });     
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
    const onSearch = event => {
      setSearch(event.target.value);
    };


    return(
        <div className="searchTab">
        <div className="form1">
        <form className="form">
          <button className="button" type="submit">
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0)">
<path d="M23.9179 21.8602L18.0916 15.9194C19.5896 14.1735 20.4104 11.9768 20.4104 9.68999C20.4104 4.34701 15.9764 0 10.5266 0C5.07678 0 0.642822 4.34701 0.642822 9.68999C0.642822 15.033 5.07678 19.38 10.5266 19.38C12.5726 19.38 14.5222 18.775 16.1892 17.6265L22.0597 23.6124C22.3051 23.8622 22.6351 24 22.9888 24C23.3235 24 23.6411 23.8749 23.8822 23.6474C24.3944 23.1641 24.4108 22.3628 23.9179 21.8602ZM10.5266 2.52782C14.5549 2.52782 17.832 5.74069 17.832 9.68999C17.832 13.6393 14.5549 16.8522 10.5266 16.8522C6.49832 16.8522 3.2212 13.6393 3.2212 9.68999C3.2212 5.74069 6.49832 2.52782 10.5266 2.52782Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0">
<rect width="24.48" height="24" fill="white" transform="translate(0.219971)"/>
</clipPath>
</defs>
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
              width="17"
              height="17"
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

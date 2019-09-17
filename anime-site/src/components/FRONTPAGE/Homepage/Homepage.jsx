import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Homepage.css"
import {IP} from "../../../IP"

const Homepage = () =>{
    const  [anime,setAnime] = useState([]);
    const  [ongoing,setOngoing] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [popular,setPopular] = useState([]);

    useEffect(() => {axios(`${IP}/homepage`).then(res =>{
        setAnime(res.data); 
        })
    },[]);
    useEffect(()=> {axios(`${IP}/ongoing-animes`).then(res =>{
        setOngoing(res.data)
    })
    },[])
    useEffect(()=> {axios(`${IP}/popular`).then(res =>{
        setPopular(res.data)
    })
    },[])

    const maxPageNumber = Math.floor(anime.length/12)
    return (
<div className="content-container">
    <div className="anime">
        <div className="latest-anime">
            {/* Bara unde scrie latest Episodes  si e gata */}
            <div className="prima-bara">
                <div className="category">
                    Latest<div className="thin">&nbsp;Episodes</div> 
                </div>
                <div className="sub-dub">
                   <button className="sub"> SUB</button>|<button className="dub">DUB</button> 
                </div>
                <div className="pagination">
                    <div className="button-left"onClick = { () =>{
                        if(currentPage>1)
                       {setCurrentPage(currentPage-1);}
                   }} >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0)">
                        <path d="M3.29683 6.30693L9.31662 0.28734C9.69955 -0.0957756 10.3204 -0.0957756 10.7032 0.28734C11.0859 0.670116 11.0859 1.29094 10.7032 1.67369L5.37657 7.0001L10.703 12.3263C11.0858 12.7093 11.0858 13.33 10.703 13.7128C10.3202 14.0957 9.69939 14.0957 9.31646 13.7128L3.29667 7.69312C3.10528 7.50164 3.0097 7.25095 3.0097 7.00013C3.0097 6.74919 3.10547 6.49832 3.29683 6.30693Z" fill="#DCDCDC"/>
                        </g>
                        <defs>
                        <clipPath id="clip0">
                        <rect width="14" height="14" fill="white" transform="translate(14 14) rotate(-180)"/>
                        </clipPath>
                        </defs>
                        </svg>


                    </div>
                    <div className="page-number">
                       <h2>Page {currentPage} </h2>   
                        
                    </div>        
                    <div className="button-right" onClick = {async () =>{
                        if(currentPage<maxPageNumber)
                       setCurrentPage(currentPage+1);
                   }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0)">
                        <path d="M10.7032 7.69307L4.68338 13.7127C4.30045 14.0958 3.67959 14.0958 3.29685 13.7127C2.91407 13.3299 2.91407 12.7091 3.29685 12.3263L8.62343 6.9999L3.297 1.67367C2.91423 1.29074 2.91423 0.669973 3.297 0.287198C3.67978 -0.0957326 4.30061 -0.0957326 4.68354 0.287198L10.7033 6.30688C10.8947 6.49836 10.9903 6.74905 10.9903 6.99987C10.9903 7.25081 10.8945 7.50168 10.7032 7.69307Z" fill="#DCDCDC"/>
                        </g>
                        <defs>
                        <clipPath id="clip0">
                        <rect width="14" height="14" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>

                    </div>
                </div>
            </div>    
            
            <div className="mostPopularCard">
                    {
                        anime.slice(currentPage*12-12,currentPage*12).map( (res,idx) => {
                            
                            return (
                              <div className='flex'>
                                <div className="mediaCard">
                                <div className="img"><img src={res.image} alt={res.title}/>
                                </div>
                                
                                   <div className="mediaCardTitle">{res.title}
                                    <div className="episode"> Episode {res.episode}</div>
                                </div>
                               
                            </div>
                            
                                   </div>
                            )
                            
                        })
                    }
              </div> 
        </div>
        <div className="most-popular">

                    <div className="category">
                    Most<div className="thin">&nbsp;Popular</div> 
                </div>
            <div className="popular-grid">
                {
                    popular.map((el,idx)=>{
                        return (
                            <div className="popular-card"> 
                                <img src={el.img} alt=""/>
                                <div className="info">
                                    <div className="popular-title">{el.title}</div>
                                    <div className="rating"> <div className="blue">MAL&nbsp;</div>  Rating: {el.rating}</div>
                                    <div className="categories">Genre: {el.genre}</div>
                                    <div className="description">Summary: {el.plot}</div>
                                </div>
                            </div>
                            
                        )
                    })
                }
            </div>
        </div>
    </div>
    <div className="ongoing">
         <div className="ongoing-title">
             <h2>ONGOING ANIMES</h2> 
             
         </div>
         {
               ongoing.map( (el,idx)=>{
                   let idx1 = toString(idx);
                       
                       return(
                           <div className="ongoing-title1">
                           <div className="img1">
                            <img src={el.img} alt={el.title}/>
                           </div>
                           <div className="title"> {el.title} </div>
                           </div>
                       )          
               })
             }
    </div>
</div>



    )
}
export default Homepage;
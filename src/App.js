import { useEffect, useState } from "react";
import { TVShowAPI } from "../src/services/tv-shows"
import logoImg from "./assets/images/logo.png";
import { Logo } from "./components/Logo/Logo";
// import { SearchBar } from "./components/SearchBar/SearchBar";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
// import { TVShowList } from "./components/TVShowList/TVShowList";
import { BACKDROP_BASE_URL } from "./config";
import s from "./style.module.css";

export function App() {
  
  const [currentTVShow, setCurrentTVShow] = useState({})
//   const [tvShowRecommendations, setTvShowRecommendations] = useState([])

  async function fetchData() {
    
      try{
        const response = await TVShowAPI.fetchPopulars()
        console.log(response)
        setCurrentTVShow(response)
      }catch(error){
        console.log(error)
      }
     
  }
 



//   async function fetchRecommendations(id){
//     try{
//       const response = await TVShowAPI.fetchRecommendations(id);
//       setTvShowRecommendations(response.data.results.splice(0,10));
      
//     }catch(error){
//       console.log(error)
//     }
//   }


//   function updateCurrentTVShow(tvShow){
//     setCurrentTVShow(tvShow)
//   }

//   // ================================

useEffect(() => {

  fetchData()

  // unsubscribe
  return () => {
    fetchData()
  }
  // unsubscribe

},[])


//   // ================================
//   // ================================
//   useEffect(() => {

//     fetchRecommendations(currentTVShow.id);

//     return () => {
//       fetchRecommendations(currentTVShow.id)
//     }

//   }, [currentTVShow.id])
//   // ================================
// //  console.log(tvShowRecommendations)

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
             url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo img={logoImg} title="Netflix" subtitle="Netflix movies" />
          </div>
          <div className="col-md-12 col-lg-4">
            {/* <SearchBar onSubmit={fetchByTitle} /> */}
          </div>
        </div>
      </div>
      <div className="">
        {
          currentTVShow && <TVShowDetail tvShow={currentTVShow} />
        }
      </div>
      <div className="">
          {/* {
            currentTVShow && <TVShowList
            tvShowList={tvShowRecommendations}
            onClickItem={updateCurrentTVShow}
            />
          } */}
      </div>
    </div>
  );
}

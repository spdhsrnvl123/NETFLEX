import { useQuery } from "@tanstack/react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion"
import { makeImagePath } from "../utils";
import { useState } from "react";

const Wrapper = styled.div`
    background : black;
    padding-bottom: 200px;
`

const Loader = styled.div`
    height : 20vh;
    display:flex;
    justify-content: center;
    align-items : center;
`

const Banner = styled.div<{bgPhoto:string}>`
    height:100vh;
    display:flex;
    flex-direction:column;
    justify-content: center;
    padding:60px;
    background-image : linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${(props) => props.bgPhoto});
    background-size:cover;
`

const Title = styled.h2`
    font-size : 68px;
    margin-bottom : 20px;
`

const OverView = styled.p`
    font-size:30px;
    width:50%;
`

const Slider = styled.div`
    position: relative;
    top:-100px;
`

const Row = styled(motion.div)`
    display:grid;
    gap:5px;
    grid-template-columns: repeat(6,1fr);
    position: absolute;
    width: 100%;
`

const Box = styled(motion.div)<{bgPhoto:string}>`
    background-color: white;
    background-image: url(${(props) => props.bgPhoto});
    background-size: cover;
    background-position: center center;
    font-size: 66px;
    height: 200px;
`

const rowVariants = {
    hidden : {
        x: window.outerWidth + 5,
    },
    visible : {
        x : 0
    },
    exit : {
        x : -window.outerWidth - 5,
    }
}

const offset = 6;

function Home(){
    const {data,isLoading} = useQuery<IGetMoviesResult>(
        ["movie","nowPlaying"],
        getMovies
    );

    console.log(data?.results);

    const [index,setIndex] = useState(0);
    const [leaving,setLeaving] = useState(false);
    console.log(leaving);
    const increaseIndex = ()=> {
        if(data){
            if(leaving) return;
            toggleLeaving();
            const totalMovies = data.results.length -1;
            const maxIndex = Math.floor(totalMovies / offset) -1;
            setIndex((prev)=>(prev === maxIndex ? 0 : prev + 1))
        }
    }

    const toggleLeaving = () => setLeaving((prev) => !prev)

    console.log(index);
    
    return(
        <Wrapper>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Banner 
                        onClick={increaseIndex}
                        bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
                    >
                        <Title>{data?.results[0].title}</Title>
                        <OverView>{data?.results[0].overview}</OverView>
                    </Banner>
                    <Slider>
                        {/* onExitComplete에 함수를 넣으면 exit이 끝났을 때 실행된다. */}
                        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                        {/* initial={false}를 사용하면 라우터를 이동해도 슬라이드가 그대로 유지된다. */}
                        <Row 
                            variants={rowVariants} 
                            initial = "hidden"
                            animate="visible"
                            exit = "exit"
                            transition={{ type : "tween", duration : 1 }}
                            key={index}
                        >
                            {data?.results.slice(1).slice(offset*index, offset*index+offset).map((movie)=> (
                                <Box 
                                    key={movie.id} 
                                    bgPhoto={makeImagePath(movie.backdrop_path,"w500")}
                                />
                            ))}
                        </Row>
                        </AnimatePresence>
                    </Slider>
                </>
            )}
        </Wrapper>
    )
}

export default Home;
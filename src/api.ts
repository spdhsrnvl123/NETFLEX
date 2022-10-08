const API_KEY = "6092b4450e53284b8947334ec00f6cb3";

const BASE_PATH = "https://api.themoviedb.org/3";

export function getMovies(){
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
            (response) => response.json()
    );
}

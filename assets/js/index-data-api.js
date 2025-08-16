let apiKey = "api_key=e99a12651789055898c74f477e0ac354"
let baseTmdbUrl = "https://api.themoviedb.org/3";
let imageBaseUrl = "https://image.tmdb.org/t/p/w500";

// GET HERO SLIDER
async function getHeroSlider($limit = 3) {
    try {
        const res = await axios.get(`${baseTmdbUrl}/discover/movie?${apiKey}&page=2`);
        console.log(res.data.results);
        
        const heroSlides = document.getElementById('hero__slides');
        res.data.results.slice(0, $limit).map((mv, index) => {
            const slide = document.createElement('li');
            slide.setAttribute('key', index);
            slide.className = 'splide__slide';
            slide.innerHTML = `
                <div class="hero__slide" data-bg="${imageBaseUrl}${mv.backdrop_path}">
                    <div class="hero__content">
                        <h2 class="hero__title">${mv.title} <sub class="yellow">${mv.vote_average.toFixed(1)}</sub></h2>
                        <p class="hero__text">
                            ${mv.overview}
                        </p>
                        <p class="hero__category">
                            <a href="#">Action</a>
                            <a href="#">Adventure</a>
                            <a href="#">Drama</a>
                        </p>
                        <div class="hero__actions">
                            <a href="movie-details.html?movie=${mv.id}" class="hero__btn">
                                <span>Watch now</span>
                            </a>
                        </div>
                    </div>
                </div>`;
            heroSlides.appendChild(slide);
        });
    } catch (error) {
        console.log('Error fetching hero slider data:', error);
    }
}
getHeroSlider();

// GET 2O25-MOVIES
async function getNowPlayingMovies($limit = 12) {
    try {
        const res = await axios.get(`${baseTmdbUrl}/movie/now_playing?${apiKey}&page=4`);
        const catalogDiv = document.getElementById('catalog');

        res.data.results.slice(0, $limit).map((mv, index) => {
            const mvDiv = document.createElement('div');
            mvDiv.setAttribute('key', index);
            mvDiv.className = 'col-6 col-sm-4 col-lg-3 col-xl-2';

            mvDiv.innerHTML = `
                <div class="item">
                    <div class="item__cover">
                        <img src="${imageBaseUrl}${mv.poster_path}" alt="">
                        <a href="movie-details.html?movie=${mv.id}" class="item__play">
                            <i class="ti ti-player-play-filled"></i>
                        </a>
                        <span class="item__rate item__rate--yellow">${mv.vote_average.toFixed(1)}</span>
                        <button class="item__favorite" type="button"><i class="ti ti-bookmark"></i></button>
                    </div> 
                    <div class="item__content">
                        <h3 class="item__title"><a href="movie-details.html?movie=${mv.id}">${mv.title}</a></h3>
                        <span class="item__category">
                            <a href="#">Romance</a>
                            <a href="#">Drama</a>
                            <a href="#">Action</a>
                        </span>
                    </div>
                </div>
            `;
            catalogDiv.appendChild(mvDiv);
        });
    } catch (error) {
        console.log('Error fetching 2025 movies:', error);
    }
}
getNowPlayingMovies();

// GET POPULAR MOVIES
async function getPopularMovies($limit = 20) {
    try {
        const res = await axios.get(`${baseTmdbUrl}/movie/popular?${apiKey}`);
        const popularMoviesUl = document.getElementById('popular_movies_ul');

        res.data.results.slice(0, $limit).map((mv, index) => {
            const mvLi = document.createElement('li');
            mvLi.setAttribute('key', index);
            mvLi.className = 'splide__slide';

            mvLi.innerHTML = `
                <div class="item item--carousel">
                    <div class="item__cover">
                        <img src="${imageBaseUrl}${mv.poster_path}" alt="">
                        <a href="movie-details.html?movie=${mv.id}" class="item__play">
                            <i class="ti ti-player-play-filled"></i>
                        </a>
                        <span class="item__rate item__rate--green">${mv.vote_average.toFixed(1)}</span>
                        <button class="item__favorite" type="button"><i
                                class="ti ti-bookmark"></i></button>
                    </div>
                    <div class="item__content">
                        <h3 class="item__title"><a href="movie-details.html?movie=${mv.id}">${mv.title}</a></h3>
                        <span class="item__category">
                            <a href="#">Action</a>
                            <a href="#">Triler</a>
                        </span>
                    </div>
                </div>
            `;
            popularMoviesUl.appendChild(mvLi);
        });
    } catch (error) {
        console.log('Error fetching popular movies:', error);
    }
}
getPopularMovies();

// GET POPULAR TV SERIES
async function getPopularTVSeries($limit = 20) {
    try {
        const res = await axios.get(`${baseTmdbUrl}/tv/popular?${apiKey}`);
        const popularTVSeries = document.getElementById('popular_tv_series');

        res.data.results.slice(0, $limit).map((mv, index) => {
            const mvLi = document.createElement('li');
            mvLi.setAttribute('key', index);
            mvLi.className = 'splide__slide';

            mvLi.innerHTML = `
                <div class="item item--carousel">
                    <div class="item__cover">
                        <img src="${imageBaseUrl}${mv.poster_path}" alt="">
                        <a href="movie-details.html?movie=${mv.id}" class="item__play">
                            <i class="ti ti-player-play-filled"></i>
                        </a>
                        <span class="item__rate item__rate--red">${mv.vote_average.toFixed(1)}</span>
                        <button class="item__favorite" type="button"><i
                                class="ti ti-bookmark"></i></button>
                    </div>
                    <div class="item__content">
                        <h3 class="item__title"><a href="">${mv.name}</a></h3>
                        <span class="item__category">
                            <a href="#">Action</a>
                            <a href="#">Triler</a>
                        </span>
                    </div>
                </div>
            `;
            popularTVSeries.appendChild(mvLi);
        });
    } catch (error) {
        console.log('Error fetching popular movies:', error);
    }
}
getPopularTVSeries();










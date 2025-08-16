let baseTmdbUrl = "https://api.themoviedb.org/3";
let imageBaseUrl = "https://image.tmdb.org/t/p/w500";
let apiKey = "api_key=e99a12651789055898c74f477e0ac354";
let movieId = new URLSearchParams(window.location.search).get('movie');

let getDetails = (movieId) => `${baseTmdbUrl}/movie/${movieId}?${apiKey}`;
let getImages = (movieId) => `${baseTmdbUrl}/movie/${movieId}/images?${apiKey}`;
let getVideos = (movieId) => `${baseTmdbUrl}/movie/${movieId}/videos?${apiKey}`;
let getCredits = (movieId) => `${baseTmdbUrl}/movie/${movieId}/credits?${apiKey}`;


async function getAll(movieId) {
    try {
        const resDetail = await axios.get(getDetails(movieId));
        const mvDetail = resDetail.data;

        const resCredits = await axios.get(getCredits(movieId));
        const mvCredits = resCredits.data.cast.slice(0, 5);

        const resImages = await axios.get(getImages(movieId));
        const mvImages = resImages.data.backdrops.slice(0, 9);

        const resVideos = await axios.get(getVideos(movieId));
        const mvVideos = resVideos.data.results.slice(0, 1);

        const colMvDetail = document.getElementById('col_mv_detail');
        colMvDetail.innerHTML = `
            <h1 class="section__title section__title--head">${mvDetail.title}</h1>
           <div class="item item--details">
                <div class="row mb-lg-5 mb-md-5">
                    <!-- card cover -->
                    <div class="col-12 col-sm-5 col-md-5 col-lg-4 col-xl-6 col-xxl-5">
                        <div class="item__cover">
                            <img src="${imageBaseUrl}${mvDetail.poster_path}" alt="">
                            <span class="item__rate item__rate--green">8.4</span>
                            <button class="item__favorite item__favorite--static" type="button"><i
                                    class="ti ti-bookmark"></i></button>
                        </div>
                    </div>
                    <!-- end card cover -->

                    <!-- card content -->
                    <div class="col-12 col-md-7 col-lg-8 col-xl-6 col-xxl-7">
                        <div class="item__content">
                            <ul class="item__meta">
                                <li><span>Director:</span> <a href="actor.html">Seth Sopheara</a></li>
                                <li><span>Cast:</span> 
                                ${mvCredits.map((cast, index) => `<a key="${index}" href="actor.html">${cast.name}</a>`).join('')}
                                <li><span>Genre:</span> 
                                ${mvDetail.genres.map((gen, i) => { return `<a key="${i}" href="actor.html">${gen.name}</a>`; }).join('')}
                                </li>
                                <li><span>Release date:</span> ${mvDetail.release_date}</li>
                                <li><span>Running time:</span> ${mvDetail.runtime} min</li>
                                <li><span>Country:</span> <a href="catalog.html">${mvDetail.origin_country}</a></li>
                            </ul>

                            <div class="item__description" data-scrollbar="true" tabindex="-1"
                                style="overflow: hidden; outline: none;">
                                <div class="scroll-content">
                                    <p>${mvDetail.overview}</p>
                                </div>
                                <div class="scrollbar-track scrollbar-track-x show" style="display: none;">
                                    <div class="scrollbar-thumb scrollbar-thumb-x"
                                        style="width: 616px; transform: translate3d(0px, 0px, 0px);"></div>
                                </div>
                                <div class="scrollbar-track scrollbar-track-y show" style="display: block;">
                                    <div class="scrollbar-thumb scrollbar-thumb-y"
                                        style="height: 91.954px; transform: translate3d(0px, 0px, 0px);">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end card content -->
                </div>
            </div>
        `;

        const colMvPlayer = document.getElementById('vid_wrapper');
        colMvPlayer.innerHTML = `
           <iframe src="https://www.youtube.com/embed/${mvVideos[0].key}?autoplay=1" title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                style="border-radius: 16px; overflow:hidden; width:100%; height:100%;"
                >
            </iframe>
        `;

        const rowGallary = document.getElementById('gal_photoes');
        mvImages.map((img, i) => {
            const figure = document.createElement('figure');
            figure.setAttribute('key', i);
            figure.className = 'col-12 col-sm-6 col-xl-4';
            figure.setAttribute('itemprop', 'associatedMedia');
            figure.setAttribute('itemscope', '');
            figure.innerHTML = `
                <a href="${imageBaseUrl}${img.file_path}" itemprop="contentUrl"
                    data-size="1920x1280">
                    <img src="${imageBaseUrl}${img.file_path}" itemprop="thumbnail"
                        alt="Image description">
                </a>
                <figcaption itemprop="caption description">Some image caption 1</figcaption>
            `;
            rowGallary.appendChild(figure);
        });

    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}
getAll(movieId);

const getMoviePopular = async (page) => {
    try {
        const res = await axios.get(`${baseTmdbUrl}/movie/popular?${apiKey}&page=${page}`);
        const rcmMv = res.data.results.slice(0, 6);

        const divMvRecommend = document.getElementById('div_mv_recommend');
        rcmMv.map((mv, i) => {
            const colMv = document.createElement('div');
            colMv.setAttribute('key', i);
            colMv.className = 'col-6 col-sm-4 col-lg-6';
            colMv.innerHTML = `
                <div class="item">
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
                        <h3 class="item__title"><a href="details.html">${mv.title}</a>
                        </h3>
                        <span class="item__category">
                            <a href="#">Action</a>
                            <a href="#">Triler</a>
                        </span>
                    </div>
                </div>
            `;
            divMvRecommend.appendChild(colMv);
        });
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}
getMoviePopular(5);

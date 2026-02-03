(() => {

    // api
    // "https://swapi.info/api/people

    const characterBox = document.querySelector("#character-box");
    const movieTemplate = document.querySelector("#movie-template");
    const movieCon = document.querySelector("#movie-con");
    const baseUrl = `https://swapi.info/api/`;
   
    function getCharacters () {
        characterBox.classList.add("spinner");
        fetch(`${baseUrl}people`)
        .then((res) => res.json())
        .then(function(res) {
            console.log(res);
            const characters = res;

            const ul = document.createElement("ul");
            characterBox.appendChild(ul);

            
            for (let i = 0; i < 10; i++) {
                const character = characters[i];

                const li = document.createElement("li");
                const a = document.createElement("a");
                const img = document.createElement("img");

                a.textContent = character.name;
                a.dataset.movie = character.films;
                img.src =`images/character${i+1}.jpg`;
                li.appendChild(img);
                li.appendChild(a);
                ul.appendChild(li);
            }
            characterBox.classList.remove("spinner");
        })
        .then(function () {
            const links = document.querySelectorAll("#character-box ul li a");
            console.log(links);
            links.forEach(function(link) {
            link.addEventListener("click",getMovies);
            })
        })
        .catch(function(err){
            console.log(err);
            characterBox.innerHTML = "<p>Oops! The characters went off to play hide-and-seek.</p>";
        });
    }

    function getMovies (e) {
        const movieIDs = e.currentTarget.dataset.movie.split(",");
        console.log(movieIDs);

        movieCon.innerHTML = "";
        
        movieIDs.forEach(movieID => {
            fetch(`${movieID}`)
            .then((res) => res.json())
            .then(movie => {
                console.log(movie.title);
                console.log(movie.opening_crawl);
                console.log(movie.release_date);

                const clone = movieTemplate.content.cloneNode(true);
                const moviePoster = clone.querySelector(".movie-poster");
                const movieTitle = clone.querySelector(".movie-title")
                const movieDate = clone.querySelector(".movie-date");
                const movieOpeningCrawl = clone.querySelector(".movie-opening-crawl");

                moviePoster.src = `images/${movie.episode_id}.jpg`;
                movieTitle.innerHTML = movie.title;
                movieDate.innerHTML = movie.release_date;
                movieOpeningCrawl.innerHTML = movie.opening_crawl;

                movieCon.appendChild(clone);
                movieCon.scrollIntoView({ behavior: 'smooth', block: 'start'});
            })
            .catch(function(err){
            console.log(err);
            movieCon.innerHTML = "<p>Oops! The movies went off to play hide-and-seek.</p>";
        });
        })
        
}

    getCharacters();

    // back to top button
    const backToTopButton = document.querySelector("#back-to-top");
    const top = document.querySelector("#characters");

    function scrollToTop () {
        top.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }

    backToTopButton.addEventListener("click", scrollToTop);
})();

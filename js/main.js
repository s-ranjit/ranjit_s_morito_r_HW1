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

                a.href = "#";
                a.textContent = character.name;
                a.dataset.movie = character.films;
                img.src =`images/character${i+1}.jpg`;
                
                a.prepend(img);
                li.appendChild(a);
                ul.appendChild(li);
            }
            characterBox.classList.remove("spinner");

            gsap.from("#character-box ul", {
                opacity: 0,
              y: 30,
              duration: 1,
              ease: "power2.out",
              stagger: 3
            })
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



    //  Header GSAP animations
gsap.registerPlugin(ScrollTrigger); 
gsap.from("#logo", {
  opacity: 0,
  y: -40,
  duration: 2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#logo",
    toggleActions: "play none none none",
    start: "top 85%",
    end: "bottom top"
  }
});
gsap.from("#ham-burger", {
  opacity: 0,
  y: -40,
  duration: 2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#logo",
    toggleActions: "play none none none",
    start: "top 85%",
    end: "bottom top"
  }
});
gsap.from(".burger-con", {
  opacity: 0,
  y: -40,
  duration: 2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".burger-con",
    toggleActions: "play none none none",
    start: "top 85%",
    end: "bottom top"
  }
});

 gsap.from(".title", {
    opacity: 0, 
    y: -50,   
    duration: 2,
    ease: "power2.out",
    stagger: 0.1  
  });

 
  gsap.from(".info", {
    opacity: 0,
    y: 30, 
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".info",
        toggleActions: "play none none none",
        start: "top 85%",
        end: "bottom top"
    }
  });

gsap.from(".footer", {
  opacity: 0,
  y: 20,
  duration: 2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".footer",
    toggleActions: "restart pause reverse pause",
    start: "top 85%",
    end: "bottom top"
  }
});
})();

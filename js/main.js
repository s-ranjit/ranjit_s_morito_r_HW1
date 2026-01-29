(() => {

    // Character 
    // "https://swapi.info/api/people

    const baseUrl = `https://swapi.info/api/`;
    const characterBox = document.querySelector("#character-box");
   
    function getCharacters () {
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
                img.src =`images/character${i+1}.jpg`;
                li.appendChild(img);
                li.appendChild(a);
                ul.appendChild(li);


            }
        })
        .catch((error) => console.error(error))
    }

    getCharacters();
})();

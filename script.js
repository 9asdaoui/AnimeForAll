const budy = document.getElementById("budy");


let count = 1;

function browse(i) {
    if (i === 1 && count > 1) {  
        count--;
    }
    if (i === 2) {
        count++;
    }
    dispal();
}


function dispal() {

    budy.innerHTML = ""; 

     let load = document.getElementById("load") 
     let loading = document.createElement("img");
      loading.setAttribute("src","src/Animation.gif");
      load.appendChild(loading);

    fetch(`https://api.jikan.moe/v4/anime?&page=${count}`)
        .then(response => response.json())
        .then(data => {


            data.data.forEach(movie => {
                let div = document.createElement("div");
                div.setAttribute("class", "card");
                div.setAttribute("onclick", `saveAndNavigate(${movie.mal_id})`);               
                budy.appendChild(div);
                 
                let link = document.createElement("a");
                link.setAttribute("href","despage.html");
                div.appendChild(link);

                let title = document.createElement("h1");
                title.textContent = `${movie.title}`;
                link.appendChild(title);

                let image = document.createElement("img");
                image.setAttribute("src", `${movie.images.jpg.image_url}`);
                link.appendChild(image);

                let rate = document.createElement("p");
                rate.textContent = `Rating: ${movie.rating}`;
                link.appendChild(rate);

                let genre = document.createElement("p");
                genre.textContent = `Genres: ${movie.genres.map(genre => genre.name).join(', ')}`;
                link.appendChild(genre);



            });
loading.setAttribute("style","display: none;");

        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });       
        localStorage.setItem("lastFunction", "func1");   

}



function search() {
  budy.innerHTML = ""; 

  let load = document.getElementById("load") 
     let loading = document.createElement("img");
      loading.setAttribute("src","src/Animation.gif");
      load.appendChild(loading);

  const searchTerm = document.getElementById("searchInput").value;
  const url = `https://api.jikan.moe/v4/anime?q=${searchTerm}&type=movie`;


  fetch(url)
        .then(response => response.json())
        .then(data => {
            data.data.forEach(movie => {


                let div = document.createElement("div");
                div.setAttribute("class", "card");
                div.setAttribute("onclick", `saveAndNavigate(${movie.mal_id})`);
                budy.appendChild(div);
                

                let link = document.createElement("a");
                link.setAttribute("href","despage.html");
                div.appendChild(link);

                let title = document.createElement("h1");
                title.textContent = `${movie.title}`;
                link.appendChild(title);



                let image = document.createElement("img");
                image.setAttribute("src", `${movie.images.jpg.image_url}`);
                link.appendChild(image); 

                let rate = document.createElement("p");
                rate.textContent = `Rating: ${movie.rating}`;
                link.appendChild(rate);

                let genre = document.createElement("p");
                genre.textContent = `Genres: ${movie.genres.map(genre => genre.name).join(', ')}`;
                link.appendChild(genre);


            
            });
loading.setAttribute("style","display: none;");
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
        localStorage.setItem("lastFunction", "func2");
}

  
function saveAndNavigate(id) {
    localStorage.setItem("animeId", id); 
    window.location.href = 'despage.html';
}

function sortAndfilter() {
    const sortBy = document.getElementById("sortOptions").value;
    const genre = document.getElementById("genreOptions").value;
    budy.innerHTML = ""; 

  let load = document.getElementById("load") 
     let loading = document.createElement("img");
      loading.setAttribute("src","src/Animation.gif");
      load.appendChild(loading);

  const url = `https://api.jikan.moe/v4/anime?genres=${genre}&order_by=${sortBy}&sort=desc`;

console.log(url);


  fetch(url)
        .then(response => response.json())
        .then(data => {
            data.data.forEach(movie => {


                let div = document.createElement("div");
                div.setAttribute("class", "card");
                div.setAttribute("onclick", `saveAndNavigate(${movie.mal_id})`);
                budy.appendChild(div);
                

                let link = document.createElement("a");
                link.setAttribute("href","despage.html");
                div.appendChild(link);

                let title = document.createElement("h1");
                title.textContent = `${movie.title}`;
                link.appendChild(title);



                let image = document.createElement("img");
                image.setAttribute("src", `${movie.images.jpg.image_url}`);
                link.appendChild(image); 

                let rate = document.createElement("p");
                rate.textContent = `Rating: ${movie.rating}`;
                link.appendChild(rate);

                let genre = document.createElement("p");
                genre.textContent = `Genres: ${movie.genres.map(genre => genre.name).join(', ')}`;
                link.appendChild(genre);


            
            });
        loading.setAttribute("style","display: none;");
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });

        localStorage.setItem("lastFunction", "func3");
}



function runLastFunction() {
    const lastFunction = localStorage.getItem("lastFunction");
    if (lastFunction) {
        switch (lastFunction) {
            case "func1":
                dispal();
                break;
            case "func2":
                search();
                break;
            case "func3":
                sortAndfilter();
                break;

            default:
                console.log("No function executed previously.");
        }
    } else {
               dispal();    }
}

window.onload = runLastFunction;


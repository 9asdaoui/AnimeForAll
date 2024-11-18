const moviePage = document.getElementById("moviePage");

const animeId = localStorage.getItem("animeId");
console.log(animeId);

function dispalPage(animeId) {




    fetch(`https://api.jikan.moe/v4/anime/${animeId}`)
        .then(response => response.json())
        .then(data => {
            const movie = data.data;

            let div = document.createElement("div");
            div.setAttribute("class", "page");
            moviePage.appendChild(div);

            let button = document.createElement("button");
            button.textContent="X"
            button.setAttribute("onclick","window.location='index.html'")
            div.append(button)

            let title = document.createElement("h1");
            title.textContent = `Title: ${movie.title}`;
            div.appendChild(title);

            let rate = document.createElement("p");
            rate.textContent = `Rating: ${movie.rating}`;
            div.appendChild(rate);

            let genre = document.createElement("p");
            genre.textContent = `Genres: ${movie.genres.map(genre => genre.name).join(', ')}`;
            div.appendChild(genre);

            let image = document.createElement("img");
            image.setAttribute("src", `${movie.images.jpg.image_url}`);
            div.appendChild(image);

            let description = document.createElement("p");
            description.textContent = `Description: ${movie.synopsis || "No description available."}`;
            div.appendChild(description);

           


        })

        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

 dispalPage(animeId)
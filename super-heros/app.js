let movieList = document.getElementById("movieList")
let dynamicContent = document.getElementsByClassName("dynamicContent")[0]

let moviesURL = "http://www.omdbapi.com/?s=Batman&page=2&apikey=1cc927a"

let req = new XMLHttpRequest()

function showDetails(id) {
    
    let detailURL = `http://www.omdbapi.com/?i=${id}&apikey=1cc927a`
    console.log(detailURL)
    let req = new XMLHttpRequest()
    req.open('GET',detailURL)
    req.addEventListener('load',function (){
        let details = JSON.parse(event.currentTarget.responseText)
        console.log(details)
        let detailItems = `<div class=movieDetail>
                        <h3>${details.Title}</h3>
                        <img src='${details.Poster}' />
                        <h4>${details.Year}</h4>
                        <h4>${details.Director}</h4>
                    </div>`

        dynamicContent.innerHTML = detailItems
    })
    req.send()
}


req.open('GET',moviesURL)

req.addEventListener('load',() => {
    let movies = JSON.parse(event.currentTarget.responseText)

    let movieItems = movies.Search.map(movie => {
        return `<div class="movieItem">
                    <img src='${movie.Poster}' onclick="showDetails('${movie.imdbID}')"/>
                    <h4>${movie.Title}</h4>
                </div>`
    })

    movieList.innerHTML = movieItems.join('')
    
    
    })
    req.send()
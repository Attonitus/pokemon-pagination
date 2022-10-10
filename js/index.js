const $main = document.querySelector("main"),
$h1 = document.querySelector("h1"),
$back = document.getElementById("back"),
$next = document.getElementById("next"),
$fragment = document.createDocumentFragment()
let page = 0

$back.disabled = true

const getPokemon = async(page) =>{
    $main.innerHTML=`<img src="./svg/spinning-circles.svg" alt="Cargando">`

    try {
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=20`),
        json = await res.json()

        if(!res.ok) throw {status: res.status, statusText: res.statusText}

        json.results.forEach(ele => {
            const $p = document.createElement("p"),
            $article = document.createElement("article")
            $p.innerHTML = ele.name


            fetch(ele.url)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(json => {
                // $fetch.innerHTML = json
                console.log(json)
                let sprite = json.sprites.front_default
                const $img = document.createElement("img")
                $img.setAttribute("src", `${sprite}`)
                $img.setAttribute("alt", `Imagen de ${ele.name}`)
                $img.setAttribute("title", `Imagen de ${ele.name}`)
                $article.appendChild($img)
            })
        
            .catch(err =>{
                let message = err.statusText ||'ocurrió un error'
                $h1.innerHTML = `Error ${err.status}: ${message}`
            })


            $article.appendChild($p)
            $fragment.appendChild($article)
        });

        $main.innerHTML=""
        $main.appendChild($fragment)
    } catch (err) {
        let message = err.statusText || "Ocurrio un error"
        $h1.innerHTML = `Error ${err.status}: ${message}`
    }
}

document.addEventListener("DOMContentLoaded", getPokemon(page))


$back.addEventListener("click", e =>{
    page = page - 20
    if(page === 0) $back.disabled = true
    getPokemon(page)
})


$next.addEventListener("click", e=>{
    page = page +20
    if(page>0) $back.disabled = false
    getPokemon(page)
})


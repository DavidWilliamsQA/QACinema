let searchBox = document.getElementById("searchBox");
let searchButton = document.getElementById("searchButton");

function search(){
    window.location.href = `search.html?term=${searchBox.value}`;
}

searchButton.addEventListener("click",search);

searchBox.addEventListener("keypress",function(event){
    if (event.key  === "Enter") {
        event.preventDefault();
        search();
    }
})
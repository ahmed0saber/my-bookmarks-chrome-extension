/* remove item from bookmarks */
const removeItem = (e) => {
    e.target.parentNode.remove()
    for(let i=0; i<storedBookmarks.length; i++){
        if(e.target.parentNode.querySelector("a").textContent == storedBookmarks[i].name){
            storedBookmarks.splice(i, 1)
            localStorage.setItem("storedBookmarks3", JSON.stringify(storedBookmarks))
        }
    }
}
let removeBtns = document.getElementsByClassName("remove")
for(let i=0; i<removeBtns.length; i++){
    removeBtns[i].addEventListener("click", removeItem)
}
/* a function that displays an item in the dom */
let bookmarksContainer = document.querySelector(".bookmarks")
const createBookmark = (name, url) => {
    let newBookmark = document.createElement("div")
    newBookmark.classList.add("bookmark")
    newBookmark.innerHTML = `
        <a href="${url}" target="_blank">${name}</a>
        <span class="remove">x</span>
    `
    bookmarksContainer.appendChild(newBookmark)
    newBookmark.querySelector(".remove").addEventListener("click", removeItem)
}
/* get data from local storage and display it */
let storedBookmarks = []
if(localStorage.getItem("storedBookmarks3")){
    storedBookmarks = JSON.parse(localStorage.getItem("storedBookmarks3"))
}else{
    localStorage.setItem("storedBookmarks3", JSON.stringify(storedBookmarks))
}
for(let i=0; i<storedBookmarks.length; i++){
    createBookmark(storedBookmarks[i].name, storedBookmarks[i].url)
}
/* add item to bookmarks */
document.getElementById("btn").addEventListener("click", function(){
    let nameInput = document.getElementById("name")
    let urlInput = document.getElementById("url")
    let valid = true
    for(let i=0; i<storedBookmarks.length; i++){
        if(nameInput.value == storedBookmarks[i].name){
            alert("This name already exists")
            valid = false
        }
    }
    if(nameInput.value.trim() == ""){
        alert("The website name is required")
        valid = false
    }
    if(urlInput.value.trim() == ""){
        alert("The website url is required")
        valid = false
    }
    if(!valid){
        return
    }
    let bookmarkAsObject = {
        name: nameInput.value,
        url: urlInput.value
    }
    storedBookmarks.push(bookmarkAsObject)
    localStorage.setItem("storedBookmarks3", JSON.stringify(storedBookmarks))
    createBookmark(nameInput.value, urlInput.value)
    nameInput.value = ""
    urlInput.value = ""
})
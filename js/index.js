// document.addEventListener("DOMContentLoaded", function() {});
const currentUser = {
    "id": 11,
    "username": "test99"
}

function fetchBooks() {
    fetch("http://localhost:3000/books")
    .then(response => response.json())
    .then(books => books.forEach(book => renderBook(book)))
    // .then(books => books.forEach(renderBook))
}

function renderBook(bookData) {
    //! pretend we have access to one book object at the time, here's what we want to do:
    //* create an li dom node
    const li = document.createElement("li")
    //* set the text of the li to the book's title
    li.innerText = bookData.title
    //* target the ul#list element
    const ul = document.getElementById("list")
    //* attach the click onto the li here because you have a lot of juicy variables in scope to use
    li.addEventListener("click", (e) => displayBookDetails(bookData, li))
    //* append the li into the ul#list
    ul.append(li)
}

function displayBookDetails(bookData, li) {
    //* target the place of the DOM where we will append all of the data
    const showPanel = document.getElementById("show-panel")
    //* empty the ul not to duplicate the info
    showPanel.innerHTML = ""
    //* we need to create each node element needed to display the info: img, h1, h2 (subtitle), h2 (author), p, ul + lis one per user
    const bookTitle = document.createElement("h1")
    bookTitle.innerText = bookData.title
    const bookSubtitle = document.createElement("h2")
    bookSubtitle.innerText = bookData.subtitle
    const bookAuthor = document.createElement("h2")
    bookAuthor.innerText = bookData.author
    const bookDesc = document.createElement("p")
    bookDesc.innerText = bookData.description
    const bookImage = document.createElement("img")
    bookImage.src = bookData.img_url
    bookImage.alt = bookData.title
    const bookLikesUl = document.createElement("ul")

    bookData.users.forEach(userDataObj => {
        //* create the li
        const listLi = document.createElement("li")
        //* take the username out of the object and set it as the li's innerText
        listLi.innerText = userDataObj.username
        //* append the listLi inside bookLikesUl
        bookLikesUl.append(listLi)
    })

    const likeBtn = document.createElement("button")
    likeBtn.innerText = "LIKE"
    likeBtn.addEventListener("click", () => {
        likeBtn.innerText = (likeBtn.innerText === "LIKE") ? "UNLIKE" : "LIKE"
    })

    showPanel.append(bookImage, bookTitle, bookSubtitle, bookAuthor, bookDesc, bookLikesUl, likeBtn)
}

fetchBooks()
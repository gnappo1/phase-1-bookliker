
//! Globals
const booksUrl = 'http://localhost:3000/books'
const usersUrl = 'http://localhost:3000/users'

const list = document.getElementById('list')
// const listFn = () => document.getElementById('list')
const showPanel = document.querySelector('#show-panel')

//! Helpers
const emptyDetails = () => showPanel.innerHTML = ''

const appendUserToUl = (user, ul) => {
    const userLi = document.createElement('li')
    userLi.innerText = user.username
    ul.append(userLi)
}

const showDetails = (book) => {
    //! clean the DOM branch you will be appending the clicked book
    emptyDetails()
    //! work on appending the book to the DOM
    const h1 = document.createElement('h1')
    h1.innerText = book.title
    const img = document.createElement('img')
    img.src = book.img_url
    img.alt = book.title
    const p = document.createElement('p')
    p.innerText = book.description
    const ul = document.createElement('ul')
    book.users.forEach(user => appendUserToUl(user, ul))
    showPanel.append(h1, img, p, ul)
}

const displayTitle = (book) => {
    const li = document.createElement('li')
    li.innerText = book.title
    li.addEventListener('click', () => showDetails(book))
    list.append(li)
}

const fetchData = () => {
    fetch(booksUrl)
    .then(resp => resp.json())
    .then(books => {
        books.forEach(book => displayTitle(book))
    })
    .catch(err => console.log(err))
}

//! Invoke
fetchData()
document.addEventListener('DOMContentLoaded', async function() {
    /*
    Add event listener function
        while initial HTML file is loaded completely 
        async function() is allowed to use await to wait for the finish of async operation
    */
    try {
        const booksData = await fetchBooksData('book.xml');  //acquire data from xml
        const booksDiv = document.getElementById('books');  //
        if (!booksDiv) {
            console.error('Error: Element with id "books" not found.');
            return;
        }
        displayBooks(booksData, booksDiv);  //display details 
    } catch (error) {
        console.error('Error:', error);
        displayError('Failed to load books data.');
    }
});

async function fetchBooksData(url) {  //fetch data from server
    const response = await fetch(url);
    if (!response.ok) {  //200-299 for checking status
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const xmlText = await response.text();  //transform it to text
    const parser = new DOMParser();
    return parser.parseFromString(xmlText, "text/xml");  //transform text to XML file and return
}

function displayBooks(booksData, booksDiv) {
    const books = booksData.querySelectorAll('book');  //searching for all 'book' elements
    books.forEach(book => {
        const title = book.querySelector('title').textContent;
        const author = book.querySelector('author').textContent;
        const price = book.querySelector('price').textContent;
        const bookDiv = createBookDiv(title, author, price);
        booksDiv.appendChild(bookDiv);  //add it to the bottom of father node
        //usage: parentElement.appendChild(childElement)
    });
}

function createBookDiv(title, author, price) {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book'; // Assuming there is a CSS class for styling
    bookDiv.innerHTML = `<h2>${title}</h2><p>Author: ${author}</p><p>Price: ${price}</p>`;
    return bookDiv;
}

function displayError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error'; // Assuming there is a CSS class for error styling
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv); // Assuming you want to display the error at the body level
}

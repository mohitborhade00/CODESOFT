let books = JSON.parse(localStorage.getItem("books")) || [];

function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

function renderBooks(filteredBooks = books) {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    filteredBooks.forEach((book, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td class="${book.available ? 'available' : 'borrowed'}">
                ${book.available ? 'Available' : 'Borrowed'}
            </td>
            <td>${book.borrower || '-'}</td>
            <td>
                ${book.available 
                    ? `<button onclick="checkoutBook(${index})">Checkout</button>` 
                    : `<button onclick="returnBook(${index})">Return</button>`
                }
            </td>
        `;

        bookList.appendChild(row);
    });
}

function addBook() {
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const isbn = document.getElementById("isbn").value.trim();

    if (!title || !author || !isbn) {
        alert("Please fill all fields");
        return;
    }

    books.push({
        title,
        author,
        isbn,
        available: true,
        borrower: null,
        checkoutDate: null
    });

    saveBooks();
    renderBooks();

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
}

function searchBook() {
    const query = document.getElementById("search").value.toLowerCase();

    const filtered = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.isbn.toLowerCase().includes(query)
    );

    renderBooks(filtered);
}

function checkoutBook(index) {
    const borrower = prompt("Enter borrower name:");
    if (!borrower) return;

    books[index].available = false;
    books[index].borrower = borrower;
    books[index].checkoutDate = new Date().toISOString();

    saveBooks();
    renderBooks();
}

function returnBook(index) {
    const checkoutDate = new Date(books[index].checkoutDate);
    const returnDate = new Date();

    const diffDays = Math.floor((returnDate - checkoutDate) / (1000 * 60 * 60 * 24));
    let fine = 0;

    if (diffDays > 7) {
        fine = (diffDays - 7) * 5; // ₹5 per extra day
    }

    alert(`Book returned.\nDays borrowed: ${diffDays}\nFine: ₹${fine}`);

    books[index].available = true;
    books[index].borrower = null;
    books[index].checkoutDate = null;

    saveBooks();
    renderBooks();
}

renderBooks();

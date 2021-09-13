let myLibrary = [];
let lastId = 0;
const modal = new bootstrap.Modal(document.querySelector("#inputBookModal"), { keyboard: false });

// Load myLibrary and lastId from cache
if (localStorage.getItem("myLibrary") !== null) {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    for (let book of myLibrary) {
        Object.setPrototypeOf(book, Book.prototype);
    }
    populateTable();
}

if (localStorage.getItem("lastId")) {
    lastId = parseInt(localStorage.getItem("lastId"));
}

function saveMyLibraryToCache() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function Book(title, author, pages, address) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.address = address;
    this.isRead = false;
    this.id = lastId + 1;
    lastId += 1;
    localStorage.setItem("lastId", lastId);
}

Book.prototype.toggleRead = function () {
    this.isRead = !this.isRead;
    document.querySelector(`tr[data-index="${this.id}"]`).classList.toggle('table-success');
    saveMyLibraryToCache();
}

Book.prototype.editBook = function () {
    this.title = document.querySelector("#title").value;
    this.author = document.querySelector("#author").value;
    this.pages = document.querySelector("#pages").value;
    this.address = document.querySelector("#location").value;
}

function addBookToLibrary(title, author, pages, address) {
    let newBook = new Book(title, author, pages, address);
    myLibrary.push(newBook);
    addBookToTable(newBook);
    saveMyLibraryToCache();
}

function deleteBookfromLibrary(id) {
    myLibrary.splice(myLibrary.findIndex((book) => book.id === id), 1);
    removeBookFromTable(id);
    saveMyLibraryToCache();
}

function populateTable() {
    for (let book of myLibrary) {
        addBookToTable(book);
        if (book.isRead) {
            document.querySelector(`tr[data-index="${book.id}"]`).classList.toggle('table-success');
            document.querySelector(`#isRead${book.id}`).setAttribute("checked", "true");
        }
    }
}

function addBookToTable(book) {
    const tableBody = document.querySelector("tbody");
    let row =
        `<tr data-index="${book.id}">
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td>${book.address}</td>
    <td><input type="checkbox" class="form-check-input" name="isRead" id="isRead${book.id}" /></td>
    <td>
    <div
        class="
        d-flex
        justify-content-around
        my-auto
        align-items-center
        flex-column flex-md-row
        "
    >
        <i class="fas fa-arrow-up my-1 my-md-0" id="up${book.id}"></i>
        <i class="fas fa-arrow-down my-1 my-md-0" id="down${book.id}"></i>
        <i class="fas fa-pencil-alt my-1 my-md-0" id="edit${book.id}"></i>
        <i class="fas fa-trash-alt my-1 my-md-0" id="trash${book.id}"></i>
    </div>
    </td>
    </tr>`

    tableBody.insertAdjacentHTML("beforeend", row);

    document.querySelector(`#isRead${book.id}`).addEventListener('click', () => {
        book.toggleRead();
    });

    document.querySelector(`#trash${book.id}`).addEventListener('click', () => {
        deleteBookfromLibrary(book.id);
    });

    document.querySelector(`#up${book.id}`).addEventListener('click', () => {
        let index = myLibrary.findIndex((obj) => obj.id === book.id)
        if (index !== 0) {
            swapBooksInLibrary(index, index - 1);
            swapBooksInTable(book.id, "previous");
        }
    });

    document.querySelector(`#down${book.id}`).addEventListener('click', () => {
        let index = myLibrary.findIndex((obj) => obj.id === book.id)
        if (index !== myLibrary.length - 1) {
            swapBooksInLibrary(index, index + 1);
            swapBooksInTable(book.id, "next");
        }
    });

    document.querySelector(`#edit${book.id}`).addEventListener('click', () => {
        if (document.querySelector("#change").classList.contains("d-none")) {
            document.querySelector("#save").classList.toggle('d-none');
            document.querySelector("#change").classList.toggle('d-none');
        }

        document.querySelector("#title").value = book.title;
        document.querySelector("#author").value = book.author;
        document.querySelector("#pages").value = book.pages;
        document.querySelector("#location").value = book.address;
        modal.show();

        saveChange = function () {
            book.editBook();
            console.log(book.id);
            saveMyLibraryToCache();
            updateTableEntry(book.id);
            document.querySelector("#title").value = '';
            document.querySelector("#author").value = '';
            document.querySelector("#pages").value = '';
            document.querySelector("#location").value = '';
            modal.hide();
            document.querySelector("#change").removeEventListener('click', saveChange);

        };

        document.querySelector("#change").addEventListener('click', saveChange);
    });
}

function removeBookFromTable(id) {

    document.querySelector(`tr[data-index="${id}"]`).remove();
}

function swapBooksInLibrary(indexA, indexB) {
    const tmp = myLibrary[indexA];
    myLibrary[indexA] = myLibrary[indexB];
    myLibrary[indexB] = tmp;
    saveMyLibraryToCache();
}

function swapBooksInTable(id, pos) {
    const row = document.querySelector(`tr[data-index="${id}"]`);
    let rowParent = row.parentNode;
    if (pos === "previous") {
        let swapRow = row.previousSibling;
        let oldRow = rowParent.removeChild(row);
        rowParent.insertBefore(oldRow, swapRow)
    } else if (pos === "next") {
        let swapRow = row.nextSibling;
        let oldRow = rowParent.removeChild(row);
        rowParent.insertBefore(oldRow, swapRow.nextSibling)
    }
}

function updateTableEntry(id) {
    let index = myLibrary.findIndex((obj) => obj.id === id)
    let oldEntry = document.querySelector(`tr[data-index="${id}"]`);
    let parent = oldEntry.parentNode;
    let nextEntry = oldEntry.nextSibling;
    parent.removeChild(oldEntry);
    addBookToTable(myLibrary[index]);
    let newEntry = document.querySelector(`tr[data-index="${id}"]`);
    parent.insertBefore(newEntry, nextEntry);
}

const addButton = document.querySelector("#save");

addButton.addEventListener('click', () => {
    addBookToLibrary(document.querySelector("#title").value,
        document.querySelector("#author").value,
        document.querySelector("#pages").value,
        document.querySelector("#location").value);

    document.querySelector("#title").value = '';
    document.querySelector("#author").value = '';
    document.querySelector("#pages").value = '';
    document.querySelector("#location").value = '';
    modal.hide();
});

document.querySelector("#mainButton").addEventListener('click', () => {
    if (document.querySelector("#save").classList.contains("d-none")) {
        document.querySelector("#save").classList.toggle('d-none');
        document.querySelector("#change").classList.toggle('d-none');
    }

    modal.show()
});

document.querySelector("#close").addEventListener('click', () => {
    document.querySelector("#title").value = '';
    document.querySelector("#author").value = '';
    document.querySelector("#pages").value = '';
    document.querySelector("#location").value = '';
    modal.hide();
    // neccesary in case event listener was created if modal opened from entry editor.
    document.querySelector("#change").removeEventListener('click', saveChange);
});
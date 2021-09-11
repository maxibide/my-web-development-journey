let myLibrary = [];

function Book(title, author, pages, address) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.address = address;
    this.isRead = false;
    if (myLibrary.length === 0) {
        this.id = 1;
    } else {
        this.id = myLibrary[myLibrary.length - 1].id + 1;
    }
}

Book.prototype.toggleRead = function () {
    this.isRead = !this.isRead;
}

function addBookToLibrary(title, author, pages, address) {
    let newBook = new Book(title, author, pages, address);
    myLibrary.push(newBook);
    addBookToTable(newBook);
}

function deleteBookfromLibrary(index) {
    removeBookfromTable(myLibrary[index].id);
    myLibrary.splice(index, 1);
}

function populateTable() {
    for (let book of myLibrary) {
        addBookToTable(book);
    }

}

function addBookToTable(book) {
    const tableBody = document.querySelector("tbody");
    let row =
        `<tr data-index-${book.id}>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td>${book.address}</td>
    <td><input type="checkbox" class="form-check-input" name="isRead" id="isRead1" /></td>
    <td>
    <div
        class="
        d-flex
        justify-content-around
        my-auto
        align-items-center
        "
    >
        <i class="fas fa-arrow-up"></i
        ><i class="fas fa-arrow-down"></i
        ><i class="fas fa-trash-alt"></i>
    </div>
    </td>
    </tr>`

    tableBody.insertAdjacentHTML("beforeend", row);

}

function removeBookfromTable(id) {

    document.querySelector(`tr[data-index-${id}]`).remove();
}

// Desde acá borrar, esto esta por ahora solo para pruebas.

addBookToLibrary("Las aventuras de Maximiliano", "Maximilano", 1000, "www.maxibidegain.com");
addBookToLibrary("Danielita la aventurera", "Daniela Anton", 99, "Librería de calibre");
addBookToLibrary("Leonardo el Vaquero", "Leíto", 80000, "En algún lugar");
addBookToLibrary("Un libro que no me gusta", "Macri", 1, "A la basura");
addBookToLibrary("Una bebe encantada", "Daiana", 101, "Librería de calibre");
console.log(JSON.parse(JSON.stringify(myLibrary)));
console.log("Marco el libro de Daniela como leído");
myLibrary[1].toggleRead();
console.log(JSON.parse(JSON.stringify(myLibrary)));
console.log("Borro el cuarto libro");
deleteBookfromLibrary(3);
console.log(JSON.parse(JSON.stringify(myLibrary)));
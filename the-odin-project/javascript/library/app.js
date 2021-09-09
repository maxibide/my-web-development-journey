let myLibrary = [];

function Book(title, author, pages, address) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.address = address;
    this.isRead = false;
}

Book.prototype.toggleRead = function () {
    this.isRead = !this.isRead;
}

function addBookToLibrary(title, author, pages, address) {
    myLibrary.push(new Book(title, author, pages, address));
}

function deleteBookfromLibrary(index) {
    myLibrary.splice(index, 1);
}

// Desde acá borrar, esto esta por ahora solo para pruebas.

addBookToLibrary("Las aventuras de Maximiliano", "Maximilano", 1000, "www.maxibidegain.com");
addBookToLibrary("Danielita la aventurera", "Daniela Anton", 99, "Librería de calibre");
addBookToLibrary("Leonardo el Vaquero", "Leíto", 80000, "En algún lugar");
addBookToLibrary("Un libro que no me gusta", "Macri",1, "A la basura");
addBookToLibrary("Una bebe encantada", "Daiana", 101, "Librería de calibre");
console.log("Estos son todos lo libros");
console.log(JSON.parse(JSON.stringify(myLibrary)));
console.log("Marco el libro de Daniela como leído");
myLibrary[1].toggleRead();
console.log(JSON.parse(JSON.stringify(myLibrary)));
console.log("Borro el cuarto libro");
deleteBookfromLibrary(3);
console.log(JSON.parse(JSON.stringify(myLibrary)));
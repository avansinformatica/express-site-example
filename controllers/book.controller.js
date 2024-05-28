const Book = require("../models/book.model");
const asyncHandler = require("express-async-handler");

// exports.index = asyncHandler(async (req, res, next) => {
//     res.send("NOT IMPLEMENTED: Site Home Page");
// });

exports.index = asyncHandler(async (req, res, next) => {
    // Get details of books, book instances, authors and genre counts (in parallel)
    const [numBooks, numBookInstances, numAvailableBookInstances, numAuthors] =
        [
            5, // Book.countDocuments({}).exec(),
            12, // BookInstance.countDocuments({}).exec(),
            7, // BookInstance.countDocuments({ status: "Available" }).exec(),
            4, // Author.countDocuments({}).exec(),
        ];

    res.render("index", {
        title: "Local Library Home",
        book_count: numBooks,
        book_instance_count: numBookInstances,
        book_instance_available_count: numAvailableBookInstances,
        author_count: numAuthors,
        genre_count: 0, // Placeholder
        message: "it works!",
    });
});

// Display list of all books.
exports.book_list = asyncHandler(async (req, res, next) => {
    // Deze data zou je dus uit de database moeten halen. Doe dat niet
    // met een http endpoint, maar maak bv een service zoals je programmeren 4 hebt geleerd.
    const books = [
        {
            title: "Harry Potter",
            author: { name: "J.K. Rowling" },
            summary:
                "Harry Potter is a series of seven fantasy novels written by British author, J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic and subjugate all wizards and Muggles.",
            isbn: "0-7475-3269-9",
            genre: ["Fantasy", "Young Adult", "Fiction"],
        },
        {
            title: "Mobile First Design",
            author: { name: "E.S. Schilling" },
            summary:
                "Mobile First Design is a design philosophy that aims to design websites for mobile devices first, and then scale up to desktop devices. This approach ensures that the website is responsive and accessible on all devices.",
            isbn: "0-7475-3269-9",
            genre: ["Web Design", "Mobile Development", "Responsive Design"],
        },
    ];

    res.render("booklist", {
        title: "Book List",
        message: "it works!",
        book_list: books,
    });
});

// Display detail page for a specific book.
exports.book_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
});

// Display book create form on GET.
exports.book_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book create GET");
});

// Handle book create on POST.
exports.book_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book create POST");
});

// Display book delete form on GET.
exports.book_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book delete GET");
});

// Handle book delete on POST.
exports.book_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book delete POST");
});

// Display book update form on GET.
exports.book_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book update GET");
});

// Handle book update on POST.
exports.book_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book update POST");
});

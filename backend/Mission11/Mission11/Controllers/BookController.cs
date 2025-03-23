using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.Data;

namespace Mission11.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;

        public BookController(BookDbContext temp)
        {
            _bookContext = temp;
        }

        [HttpGet]
        public IActionResult GetBooks(int pageSize = 10, int pageNum = 1, string sortOrder = "asc")
        {
            // Define the query to retrieve books
            var booksQuery = _bookContext.Books.AsQueryable();

            // Apply sorting based on sortOrder
            if (sortOrder.ToLower() == "desc")
            {
                booksQuery = booksQuery.OrderByDescending(b => b.Title);
            }
            else
            {
                booksQuery = booksQuery.OrderBy(b => b.Title);
            }

            // Paginate the results
            var books = booksQuery
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = _bookContext.Books.Count();

            var someObject = new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            };

            return Ok(someObject);
        }
    }
}

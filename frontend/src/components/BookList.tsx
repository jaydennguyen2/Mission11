import { useEffect, useState } from "react";
import { Book } from "../types/Books";
import { useCart } from "../context/CartContext";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { addToCart } = useCart();

  // Reset page number when selectedCategories change
  useEffect(() => {
    setPageNum(1);  // Reset page number to 1 when categories change
  }, [selectedCategories]);

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
        .join("&");

      const response = await fetch(
        `https://localhost:5000/Book?pageSize=${pageSize}&pageNum=${pageNum}${
          selectedCategories.length ? `&${categoryParams}` : ""
        }`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };
    fetchBooks();
  }, [pageSize, pageNum, selectedCategories]);

  return (
    <>
      {/* Custom Grid Layout */}
      <div className="row">
        {books.map((b) => (
          <div key={b.bookId} className="col-md-6 col-lg-4 mb-4">
            <div id="bookCard" className="card shadow h-100" style={{ backgroundColor: '#f8f9fa', borderColor: '#e3e3e3' }}>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-3" style={{ color: '#343a40' }}>{b.title}</h5>
                <ul className="list-unstyled flex-grow-1" style={{ color: '#6c757d' }}>
                  <li><strong>Author:</strong> {b.author}</li>
                  <li><strong>Publisher:</strong> {b.publisher}</li>
                  <li><strong>ISBN:</strong> {b.isbn}</li>
                  <li><strong>Classification:</strong> {b.classification}</li>
                  <li><strong>Category:</strong> {b.category}</li>
                  <li><strong>Pages:</strong> {b.pageCount}</li>
                  <li><strong>Price:</strong> ${b.price.toFixed(2)}</li>
                </ul>
                <button
                  className="btn btn-success mt-auto"
                  onClick={() =>
                    addToCart({
                      bookId: b.bookId,
                      title: b.title,
                      quantity: 1,
                      price: b.price,
                    })
                  }
                  style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls mb-3">
        <button
          className="btn btn-info"
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
          style={{ backgroundColor: '#28a745', borderColor: '#17a2b8', color: '#fff' }}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={`btn ${pageNum === i + 1 ? "btn-primary" : "btn-light"}`}
            style={{
              marginLeft: '5px',
              backgroundColor: pageNum === i + 1 ? '#80e0a7' : '#28a745',  // Dim the green color for the current page
              color: '#fff',
            }}
            onClick={() => setPageNum(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="btn btn-info"
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
          style={{ backgroundColor: '#28a745', borderColor: '#17a2b8', color: '#fff' }}
        >
          Next
        </button>
      </div>

      {/* Page Size Selector */}
      <div className="page-size-selector mb-3">
        <label style={{ color: '#6c757d' }}>
          Results per page:{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageNum(1);  // Reset to page 1 when page size changes
            }}
            style={{ backgroundColor: '#f8f9fa', borderColor: '#e3e3e3' }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
    </>
  );
}

export default BookList;

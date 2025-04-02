import { useEffect, useState } from "react";
import { Book } from "../types/Books";
import { useCart } from "../context/CartContext";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { addToCart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Reset page number when selectedCategories change
  useEffect(() => {
    setPageNum(1);  // Reset page number to 1 when categories change
  }, [selectedCategories]);

  useEffect(() => {
    const loadBooks = async () => {
      
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);
      

        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [pageSize, pageNum, selectedCategories]);

  if (loading) return <p>Loading Books...</p>;
  if (error) return <p className='text-red-500'>Error: {error}</p>;

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

              <Pagination
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={(newSize) => {
                  setPageSize(newSize);
                  setPageNum(1);
                }} 
                />    
      </div>


      
    </>
  );
}

export default BookList;

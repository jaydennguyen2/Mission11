import { useEffect, useState } from "react";
import BookList from "../components/BookList";

function BooksPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("https://localhost:5000/Book/GetBookCategories");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">📚 Bookstore</h1>

      {/* Category Filter */}
      <div className="mb-3">
        <h5>Filter by Category:</h5>
        <div className="d-flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn ${
                selectedCategories.includes(cat)
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => toggleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Book List */}
      <BookList selectedCategories={selectedCategories} />
    </div>
  );
}

export default BooksPage;
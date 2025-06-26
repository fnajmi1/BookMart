import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaStar, FaFilter, FaShoppingCart } from "react-icons/fa";
import styles from "./Home.module.css";
import bookData from "../data/book.json";
import NavBar from "../components/NavBar";
import CategoryMenu from "../components/CategoryMenu";


interface Book {
  id: number;
  name: string;
  author: string;
  category: string;
  image: string;
  price: number;
  rating: number;
  description: string;
}

interface CartItem extends Book {
  quantity: number;
}

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("popular");

  const categories = ["All", ...new Set(bookData.map(book => book.category))];

  const sortBooks = useCallback((books: Book[]) => {
    switch (sortOption) {
      case "price-low":
        return [...books].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...books].sort((a, b) => b.price - a.price);
      case "rating":
        return [...books].sort((a, b) => b.rating - a.rating);
      case "newest":
        return [...books].reverse();
      case "popular":
      default:
        return [...books].sort((a, b) => {
          const aPopularity = a.rating * 10 + (a.id % 100);
          const bPopularity = b.rating * 10 + (b.id % 100);
          return bPopularity - aPopularity;
        });
    }
  }, [sortOption]);

  useEffect(() => {
    setIsLoading(true);

    let results = bookData;

    if (selectedCategory !== "All") {
      results = results.filter(book => book.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(book =>
        book.name.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
      );
    }

    // Normalize image property to string
    const normalizedResults: Book[] = results.map(book => ({
      ...book,
      image: typeof book.image === "string" ? book.image : book.image.openLibrary
    }));

    const sortedResults = sortBooks(normalizedResults);

    setFilteredBooks(sortedResults);
    setIsLoading(false);
  }, [selectedCategory, searchQuery, sortOption, sortBooks]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    if (!user.name) navigate("/");
  }, [user, navigate]);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleAddToCart = (book: Book) => {
    const existingItem = cart.find(item => item.id === book.id);
    const updatedCart = existingItem
      ? cart.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...cart, { ...book, quantity: 1 }];

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className={styles.container}>
      <NavBar
        user={user}
        cartCount={cartCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={() => {
          console.log("Search submitted:", searchQuery);
        }}
        onFilterClick={toggleSidebar}
      />

      <CategoryMenu
        categories={categories}
        selected={selectedCategory}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          setShowSidebar(false);
        }}
        visible={showSidebar}
        onClose={() => setShowSidebar(false)}
      />

      <main className={styles.mainContent}>
        <div className={styles.headerContainer}>
          <h1 className={styles.title}>
            {selectedCategory === "All" ? "All Books" : selectedCategory}
            <span>({filteredBooks.length})</span>
          </h1>

          <div className={styles.sortContainer}>
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              className={styles.sortSelect}
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="popular">Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            Loading books...
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className={styles.empty}>
            <img src="/no-books.svg" alt="No books found" className={styles.emptyImage} />
            <h3>No books match your search</h3>
            <p>Try adjusting your filters or search terms</p>
            <button
              className={styles.clearFilters}
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
                setSortOption("popular");
              }}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className={styles.booksGrid}>
            {filteredBooks.map(book => (
              <div key={book.id} className={styles.bookCard}>
                <div className={styles.bookImage}>
                  <img src={book.image} alt={book.name} />
                  <span className={styles.price}>₹{book.price.toFixed(2)}</span>
                </div>
                <div className={styles.bookInfo}>
                  <h3>{book.name}</h3>
                  <p className={styles.author}>by {book.author}</p>
                  <div className={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.floor(book.rating) ? styles.filledStar : styles.emptyStar}
                      />
                    ))}
                    <span className={styles.ratingValue}>{book.rating}</span>
                    <span className={styles.reviewCount}>({Math.floor(book.id % 100)} reviews)</span>
                  </div>
                  <p className={styles.description}>{book.description.substring(0, 100)}...</p>
                  <button
                    onClick={() => handleAddToCart(book)}
                    className={styles.addToCart}
                  >
                    <FaShoppingCart className={styles.cartIcon} /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

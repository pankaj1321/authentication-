import { useEffect, useState } from 'react';
import { handleSucess } from '../utils';
import { ToastContainer } from "react-toastify";

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Token not found, please login");
          setLoading(false);
          return;
        }

        const url = "http://localhost:8080/products";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            'Authorization': token,
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch products");
        }

        const result = await response.json();
        setProducts(result);

      } catch (error) {
        setError(error.message || "An error occurred while fetching products");
      }
      finally {
        setLoading(false);
      }

    };

    fetchProducts();
  }, []);

  const handleLogout = () => {
    handleSucess("Logged out successfully");
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');
      window.location.href = "/login"; // Redirect to login page
    },300)

  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to the Home Page</h1>

      {error && (
        <div className="mb-4 text-red-600 text-lg font-medium">{error}</div>
      )}

      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 text-center border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{product.name}</h3>
              <p className="text-blue-600 font-bold text-lg">${product.price}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">Loading products...</p>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="mt-10 px-6 py-3 bg-purple-600 hover:bg-purple-600 text-white rounded-lg text-lg font-medium transition duration-200"
      >
        Logout
      </button> 
      <ToastContainer />
    </div>
  );
}

export default Home;


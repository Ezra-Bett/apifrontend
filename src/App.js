import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link} from "react-router-dom";

const API_URL = "http://localhost:8000/api/products/";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get(API_URL);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "price" ? parseFloat(value) || "" : value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_URL}${editingId}/`, form);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ name: "", description: "", price: "" });
    setEditingId(null);
    await fetchProducts();
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}${id}/`);
    await fetchProducts();
  };

  return (
      <div style={{ padding: 20 }}>
        <h2>React + Django CRUD App</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
          <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" step="0.01" required />
          <button type="submit">{editingId ? "Update" : "Add"} Product</button>
        </form>
        <ul>
          {products.map((p) => (
              <li key={p.id}>
                {p.name} - {p.description} - ${p.price.toFixed(2)}{" "}
                <button onClick={() => handleEdit(p)}>Edit</button>{" "}
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </li>
          ))}
        </ul>

        <Link to="/register">Register</Link><br/>
        <Link to="/">Home</Link>




        {/*<Router>*/}
        {/*  <Routes>*/}
        {/*    <Route path="/" element={<MainApp />} />*/}
        {/*    <Route path="/register" element={<Register />} />*/}
        {/*  </Routes>*/}
        {/*</Router>*/}

        {/*<Link to="/register">*/}
        {/*  <button>Register</button>*/}
        {/*</Link>*/}
      </div>


  );
}

export default App;
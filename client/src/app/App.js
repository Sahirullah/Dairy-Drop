import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Customer Pages
import Home from '../routes/Home.jsx';
import About from '../routes/About.jsx';
import Contact from '../routes/Contact.jsx';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ManageAccount from '../components/Account/ManageAccount/ManageAccount';
import MyAccount from '../components/Account/MyAccount/MyAccount';
import Shop from '../components/Shop/Shop';
import AllProducts from '../routes/AllProducts.jsx';
import ItemView from '../routes/ItemView.jsx';
import CategoryView from '../routes/CategoryView.jsx';
import SearchView from '../routes/Search.jsx';
import Login from '../components/Authentication/Login/Login';
import Register from '../components/Authentication/Register/Register';
import Wishlist from '../components/Wishlist';
import Checkout from '../routes/Checkout.jsx';
import FAQ from '../components/FAQ/FAQ';

// Context Providers
import CartItemsProvider from '../Context/CartItemsProvider';
import WishItemsProvider from '../Context/WishItemsProvider';
import SearchProvider from '../Context/SearchProvider';
import AlertProvider from '../Context/AlertProvider';
import { AdminProvider } from '../Context/AdminContext';
import { UserProvider } from '../Context/UserContext';

// Admin Components
import AdminLogin from '../components/admin/AdminLogin';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import Products from '../pages/admin/Products';
import Categories from '../pages/admin/Categories';
import Users from '../pages/admin/Users';
import Orders from '../pages/admin/Orders';

// Placeholder components for other admin pages
const Settings = () => <div style={{ padding: '20px' }}><h2>Settings</h2><p>Coming soon...</p></div>;

function App() {
  return (
    <AdminProvider>
      <UserProvider>
        <CartItemsProvider>
          <WishItemsProvider>
            <SearchProvider>
              <AlertProvider>
                <Router>
                  <Routes>
                    {/* Admin Routes - Separate Layout */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/*" element={<AdminLayout />}>
                      <Route index element={<Navigate to="/admin/dashboard" replace />} />
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="products" element={<Products />} />
                      <Route path="orders" element={<Orders />} />
                      <Route path="users" element={<Users />} />
                      <Route path="categories" element={<Categories />} />
                      <Route path="settings" element={<Settings />} />
                    </Route>

                    {/* Customer Routes - With Header/Footer */}
                    <Route path="/" element={<><Header /><main><Home /></main><Footer /></>} />
                    <Route path="/about" element={<><Header /><main><About /></main><Footer /></>} />
                    <Route path="/contact" element={<><Header /><main><Contact /></main><Footer /></>} />
                    <Route path="/account/me" element={<><Header /><main><MyAccount /></main><Footer /></>} />
                    <Route path="/account/manage" element={<><Header /><main><ManageAccount /></main><Footer /></>} />
                    <Route path="/account/login" element={<><Header /><main><Login /></main><Footer /></>} />
                    <Route path="/account/register" element={<><Header /><main><Register /></main><Footer /></>} />
                    <Route path="/shop" element={<><Header /><main><Shop /></main><Footer /></>} />
                    <Route path="/all-products" element={<><Header /><main><AllProducts /></main><Footer /></>} />
                    <Route path="/category/:id" element={<><Header /><main><CategoryView /></main><Footer /></>} />
                    <Route path="/item/men/:id" element={<><Header /><main><ItemView /></main><Footer /></>} />
                    <Route path="/item/women/:id" element={<><Header /><main><ItemView /></main><Footer /></>} />
                    <Route path="/item/kids/:id" element={<><Header /><main><ItemView /></main><Footer /></>} />
                    <Route path="/item/featured/:id" element={<><Header /><main><ItemView /></main><Footer /></>} />
                    <Route path="/wishlist" element={<><Header /><main><Wishlist /></main><Footer /></>} />
                    <Route path="/checkout" element={<><Header /><main><Checkout /></main><Footer /></>} />
                    <Route path="/faq" element={<><Header /><main><FAQ /></main><Footer /></>} />
                    <Route path="/search/*" element={<><Header /><main><SearchView /></main><Footer /></>} />
                  </Routes>
                </Router>
              </AlertProvider>
            </SearchProvider>
          </WishItemsProvider>
        </CartItemsProvider>
      </UserProvider>
    </AdminProvider>
  );
}

export default App;

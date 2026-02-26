import { useEffect, useState } from 'react';
import { TabTitle } from '../utils/General';
import axios from "axios";
import ItemCard from '../components/Card/ItemCard/ItemCard';
import ReactLoading from 'react-loading';
import './AllProducts.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AllProducts = () => {
    TabTitle("All Products - Dairy Drop");
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState(null);
    const [selectedPriceFilter, setSelectedPriceFilter] = useState('all');

    useEffect(() => {
        axios.get(`${API_URL}/products`)
            .then(res => {
                setProducts(res.data);
                setFilteredProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
        window.scrollTo(0, 0);
    }, []);

    const handlePriceFilter = (filterType) => {
        setSelectedPriceFilter(filterType);
        let filtered = products;

        switch(filterType) {
            case 'all':
                filtered = products;
                break;
            case 'under100':
                filtered = products.filter(item => item.price < 100);
                break;
            case '100to500':
                filtered = products.filter(item => item.price >= 100 && item.price < 500);
                break;
            case '500to1000':
                filtered = products.filter(item => item.price >= 500 && item.price < 1000);
                break;
            case 'above1000':
                filtered = products.filter(item => item.price >= 1000);
                break;
            default:
                filtered = products;
        }

        setFilteredProducts(filtered);
    };

    const getPriceFilterCount = (filterType) => {
        if (!products) return 0;
        switch(filterType) {
            case 'all':
                return products.length;
            case 'under100':
                return products.filter(item => item.price < 100).length;
            case '100to500':
                return products.filter(item => item.price >= 100 && item.price < 500).length;
            case '500to1000':
                return products.filter(item => item.price >= 500 && item.price < 1000).length;
            case 'above1000':
                return products.filter(item => item.price >= 1000).length;
            default:
                return 0;
        }
    };

    return (
        <div className="all__products__container">
            <div className="all__products__header">
                <h1>All Products</h1>
                <p>Browse our complete collection</p>
            </div>

            {loading && (
                <div className="all__products__loading">
                    <ReactLoading type="balls" color='#FFE26E' height={100} width={100} />
                </div>
            )}

            {!loading && products && (
                <>
                    <div className="all__products__filters">
                        <button 
                            className={`filter__btn ${selectedPriceFilter === 'all' ? 'active' : ''}`}
                            onClick={() => handlePriceFilter('all')}
                        >
                            All Products ({getPriceFilterCount('all')})
                        </button>
                        <button 
                            className={`filter__btn ${selectedPriceFilter === 'under100' ? 'active' : ''}`}
                            onClick={() => handlePriceFilter('under100')}
                        >
                            Under $100 ({getPriceFilterCount('under100')})
                        </button>
                        <button 
                            className={`filter__btn ${selectedPriceFilter === '100to500' ? 'active' : ''}`}
                            onClick={() => handlePriceFilter('100to500')}
                        >
                            $100 - $500 ({getPriceFilterCount('100to500')})
                        </button>
                        <button 
                            className={`filter__btn ${selectedPriceFilter === '500to1000' ? 'active' : ''}`}
                            onClick={() => handlePriceFilter('500to1000')}
                        >
                            $500 - $1000 ({getPriceFilterCount('500to1000')})
                        </button>
                        <button 
                            className={`filter__btn ${selectedPriceFilter === 'above1000' ? 'active' : ''}`}
                            onClick={() => handlePriceFilter('above1000')}
                        >
                            Above $1000 ({getPriceFilterCount('above1000')})
                        </button>
                    </div>

                    <div className="all__products__grid">
                        {filteredProducts && filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <ItemCard key={product._id} item={product} category="all" />
                            ))
                        ) : (
                            <div className="no__products">
                                <p>No products found in this price range</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default AllProducts;

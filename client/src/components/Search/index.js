import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchContext } from '../../Context/SearchContext';
import axios from 'axios';
import ItemCard from '../Card/ItemCard/ItemCard';
import ReactLoading from 'react-loading';
import './index.css'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Search = () => {
    const search = useContext(SearchContext)
    const [ searchParam, setSearchParam ] = useSearchParams()
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetch all products
        axios.get(`${API_URL}/products`)
            .then(res => {
                setProducts(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        const searchQuery = search.searchQuery?.toLowerCase() || ''
        setSearchParam({ query: searchQuery }, { replace: true })
        
        if (searchQuery.trim() === '') {
            setFilteredProducts([])
            return
        }

        // Filter products by name or description
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(searchQuery) ||
            (product.description && product.description.toLowerCase().includes(searchQuery)) ||
            (product.category && product.category.toLowerCase().includes(searchQuery))
        )
        setFilteredProducts(filtered)
    }, [search.searchQuery, products, setSearchParam])

    return ( 
        <div className="search__container">
            {loading ? (
                <div className="search__loading">
                    <ReactLoading type="balls" color='#FFE26E' height={100} width={100} />
                </div>
            ) : (
                <>
                    <div className="search__content">
                        <div className="search__container__header">
                            {search.searchQuery ? (
                                <h1>Search results for "{search.searchQuery}"</h1>
                            ) : (
                                <h1>Enter a search term</h1>
                            )}
                        </div>
                        
                        {filteredProducts.length > 0 ? (
                            <div className="search__results__grid">
                                {filteredProducts.map((product) => (
                                    <ItemCard key={product._id} item={product} category="search" />
                                ))}
                            </div>
                        ) : search.searchQuery ? (
                            <div className="search__no__results">
                                <p>No products found for "{search.searchQuery}"</p>
                            </div>
                        ) : null}
                    </div>
                </>
            )}
        </div>
     );
}
 
export default Search;
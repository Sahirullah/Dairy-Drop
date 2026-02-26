import { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedCard from '../../Card/RelatedCard/RelatedCard';
import './Related.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Related = (props) => {

    const [menItems, setMenItems] = useState()
    const [womenItems, setWomenItems] = useState()
    const [kidsItems, setKidsItems] = useState()

    useEffect(() => {
        axios.get(`${API_URL}/products`)
            .then(res => {
                setMenItems(res.data.filter((item) => item.category === "men"))
                setKidsItems(res.data.filter((item) => item.category === "kids"))
                setWomenItems(res.data.filter((item) => item.category === "women"))
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="related__products">
            <div className="related__header__container">
                <div className="related__header">
                    <h2>Recommended Products</h2>
                </div>
                <div className="related__header__line">

                </div>
            </div>
            <div className="related__card__container">
                <div className="related__product__card">
                    {menItems && props.category === "men" && menItems.map((item) => <RelatedCard key={item._id} item={item} />)}
                    {womenItems && props.category === "women" && womenItems.map((item) => <RelatedCard key={item._id} item={item} />)}
                    {kidsItems && props.category === "kids" && kidsItems.map((item) => <RelatedCard key={item._id} item={item} />)}

                </div>
            </div>
        </div>
    );
}

export default Related;
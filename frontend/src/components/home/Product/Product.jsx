import React from 'react';
import './Product.css';

const Product = ({ product }) => {
    return (
        <div className="product">
            {/* <img src={product.image} alt={product.name} />
            <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.price} VND</p>
            </div> */}
            <h1>Sản phẩm</h1>
        </div>
    );
}

export default Product;
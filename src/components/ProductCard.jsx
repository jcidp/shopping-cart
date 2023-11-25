import styles from "../styles/ProductCard.module.css";

const ProductCard = () => {
    return(
        <div className={styles.product}>
            <img src="https://via.placeholder.com/300/771796" alt="placeholder" />
            <div className="productInfo">
                <p>Product Name</p>
                <span>$100</span>
                <input type="number" value="1" />
                <button>Add to cart</button>
            </div>
        </div>
    );
};

export default ProductCard;
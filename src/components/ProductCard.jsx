import styles from "../styles/ProductCard.module.css";
import PropTypes from "prop-types";

const ProductCard = ({product}) => {
    return(
        <div className={styles.product}>
            <div className={styles.imgContainer}>
                <img className={styles.img} src={product.image} alt={product.title} />
            </div>
            <div className="productInfo">
                <p>{product.title}</p>
                <span>${product.price}</span>
                <input type="number" />
                <button>Add to cart</button>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object,
}

export default ProductCard;
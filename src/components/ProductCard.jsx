import styles from "../styles/ProductCard.module.css";
import PropTypes from "prop-types";
import useFetchAPI from "../hooks/useFetchAPI";

const ProductCard = ({id}) => {
    const {data, error, isLoading} = useFetchAPI(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
    
    if (error) return <><h2>Error loading data</h2></>;
    if (isLoading) return <h2>Loading...</h2>

    return(
        <div className={styles.product}>
            <img src={data.primaryImageSmall} alt={data.title} />
            <div className="productInfo">
                <p>{data.title}</p>
                <span>$100</span>
                <input type="number" />
                <button>Add to cart</button>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    id: PropTypes.number,
}

export default ProductCard;
import { useOutletContext } from "react-router-dom";
import styles from "../styles/Shop.module.css";
import ProductCard from "./ProductCard";

const Shop = () => {
    const {products, error, isLoading, handleAddToCart, setShowCart} = useOutletContext();

    if (error) return <><h2>Error loading data</h2><p>Please try reloading the page.</p></>;
    if (isLoading) return <h2>Loading...</h2>
    
    return (
        <section className="products">
            <h2>Products!</h2>
            <div className={styles.productGrid}>
                {products.map(product => 
                    <ProductCard key={product.id} product={product} handleAddToCart={handleAddToCart} setShowCart={setShowCart}/>
                )}
            </div>
        </section>
    );
};

export default Shop;
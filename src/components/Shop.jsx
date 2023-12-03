import { useOutletContext } from "react-router-dom";
import styles from "../styles/Shop.module.css";
import ProductCard from "./ProductCard";
import Loader from "./Loader";

const Shop = () => {
    const {products, error, isLoading, handleAddToCart} = useOutletContext();

    if (error) return (<div className={styles.flexGrow}>
            <h2 className={styles.h2}>Error loading data</h2>
            <p className={styles.p}>Please try reloading the page.</p>
        </div>);
    if (isLoading) return (<div className={styles.flexGrow}>
            <Loader />
        </div>);
    
    return (
        <section className="products">
            <h2 className={styles.h2}>Products!</h2>
            <div className={styles.productGrid}>
                {products.map(product => 
                    <ProductCard key={product.id} product={product} handleAddToCart={handleAddToCart}/>
                )}
            </div>
        </section>
    );
};

export default Shop;
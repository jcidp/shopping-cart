import { useOutletContext } from "react-router-dom";
import styles from "../styles/Shop.module.css";
import ProductCard from "./ProductCard";
import Cart from "./Cart";

const Shop = () => {
    const {products, error, isLoading, showCart} = useOutletContext();
    const productsGridColumns = showCart ? {} : {gridColumn: "1 / -1"};

    if (error) return <><h2>Error loading data</h2><p>Please try reloading the page.</p></>;
    if (isLoading) return <h2>Loading...</h2>
    
    return (
        <div className={styles.productPage}>
            <section className="products" style={productsGridColumns}>
                <h2>Products!</h2>
                <div className={styles.productGrid}>
                    {products.map(product => 
                        <ProductCard key={product.id} product={product}/>
                    )}
                </div>
            </section>
            {showCart && 
            <section className={styles.cart}>
                <Cart />
            </section>
            }
        </div>
    );
};

export default Shop;
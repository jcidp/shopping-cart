import styles from "../styles/Shop.module.css";
import ProductCard from "./ProductCard";

const Shop = () => {
    const products = [];
    for (let i=0; i<6; i++) {
        products.push(<ProductCard />);
    }
    
    return (
        <main>
            <section className="products">
                <h2>Products!</h2>
                <div className={styles.productGrid}>
                    {products}
                </div>
            </section>
        </main>
    )
}

export default Shop;
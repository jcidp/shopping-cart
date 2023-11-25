import useFetchAPI from "../hooks/useFetchAPI";
import styles from "../styles/Shop.module.css";
import ProductCard from "./ProductCard";

const Shop = () => {
    const {data, error, isLoading} = useFetchAPI();
    
    if (error) return <><h2>Error loading data</h2></>;
    if (isLoading) return <h2>Loading...</h2>
    
    const productIds = data.objectIDs.slice(0, 18);
    
    return (
        <section className="products">
            <h2>Products!</h2>
            <div className={styles.productGrid}>
                {productIds.map(id => 
                    <ProductCard key={id} id={id} />
                )}
            </div>
        </section>
    );
};

export default Shop;
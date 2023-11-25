import useFetchAPI from "../hooks/useFetchAPI";
import styles from "../styles/Shop.module.css";
import ProductCard from "./ProductCard";

const endpointUrl = "https://fakestoreapi.com/products";

const Shop = () => {
    const {data: products, error, isLoading} = useFetchAPI(endpointUrl);
    
    if (error) return <><h2>Error loading data</h2></>;
    if (isLoading) return <h2>Loading...</h2>
    
    // const productIds = data.objectIDs.slice(0, 18);
    console.log(products);
    
    return (
        <section className="products">
            <h2>Products!</h2>
            <div className={styles.productGrid}>
                {products.map(product => 
                    <ProductCard key={product.id} product={product} />
                )}
            </div>
        </section>
    );
};

export default Shop;
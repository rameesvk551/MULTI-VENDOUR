import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import styles from '../styles/style';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/productCard/ProductCard';
import { useSelector } from 'react-redux';

const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const categoryData = searchParams.get("category");
    
    console.log("Selected Category:", categoryData);

    const { allProducts, isProductsLoading } = useSelector((state) => state.products);
    const [data, setData] = useState([]);
console.log("pppppppprodddddd555555ddddddd",allProducts);
console.log("pppppppprod11115555ddddddd",data);

    useEffect(() => {
        if (!allProducts || allProducts.length === 0) return;  

        if (categoryData === null) {
            const d = [...allProducts].sort((a, b) => a.total_sell - b.total_sell);
            setData(d);
        } else {
            const d = allProducts.filter((i) => i.category === categoryData);
            setData(d);
        }
    }, [allProducts, categoryData]);

    return (
        <div>
            <Header activeHeading={3} />
            <br />
            <br />
            <div className={`${styles.section}`}>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((i, index) => <ProductCard key={index} data={i} />)
                    ) : (
                        <h1 className='text-center w-full pb-[110px] text-[20px]'> No products found</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;

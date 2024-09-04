"use client";

import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { ALL_PRODUCTS_QUERY_KEY, useGetAllProducts } from "../api/useGetAllProducts";
import { useDeleteProduct } from "../api/useDeleteProduct";
import styles from '@/(FSD)/shareds/styles/UserList.module.scss';
import { ProductInfo } from "@/(FSD)/shareds/types/manager/ProductInfo.type";

const ProductsList = () => {
    const queryClient = useQueryClient();
    const { data: products, isPending, error } = useGetAllProducts();
    const deleteProduct = useDeleteProduct();

    const handleDeleteProduct = useCallback(async (productId: number) => {
        if (window.confirm("정말로 이 물건을 삭제하시겠습니까?")) {
            try {
                await deleteProduct.mutateAsync(productId);
                alert("물건이 성공적으로 삭제되었습니다.");
                queryClient.invalidateQueries({ queryKey: [ALL_PRODUCTS_QUERY_KEY] });
            } catch (error) {
                console.error("물건 삭제 중 오류 발생: ", error);
                alert("브랜드 삭제 중 오류가 발생했습니다.");
            }
        }
    }, [deleteProduct, queryClient]);

    if (isPending) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={styles.tableContainer}>
            <table className={styles.userTable}>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>판매사</th>
                        <th>상품 이름</th>
                        <th>카테고리</th>
                        <th>가격</th>
                        <th>세일 가격</th>
                        <th>제품 번호</th>
                        <th>색상</th>
                        <th>액션</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product: ProductInfo) => (
                        <React.Fragment key={product.productId}>
                            <tr>
                                <td>{product.productId}</td>
                                <td>{product.brandName}</td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>
                                <td>{product.priceSale}</td>
                                <td>{product.productNumber}</td>
                                <td>{product.color}</td>
                                <td>
                                    <button className={styles.deleteButton} onClick={() => handleDeleteProduct(product.productId)}>
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsList;
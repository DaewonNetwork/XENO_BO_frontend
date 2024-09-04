"use client";

import React, { useState, useCallback } from 'react';
import { useGetAllBrand, ALL_BRAND_QUERY_KEY } from '../api/useGetAllBrand';
import { useGetAllUsers, ALL_USERS_QUERY_KEY } from '@/(FSD)/entities/manager/api/useGetAllUsers';
import styles from '@/(FSD)/shareds/styles/UserList.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import LinkBtnShared from '@/(FSD)/shareds/ui/LinkBtnShared';
import { useDeleteBrand } from '../api/useDeleteBrand';
import { useDeleteDependsUsers } from '../api/useDeleteBrandDependsUsers';

const BrandList = () => {
    const queryClient = useQueryClient();
    const { data: brands, isLoading, error, refetch } = useGetAllBrand();
    const [expandedBrands, setExpandedBrands] = useState<number[]>([]);
    const deleteBrand = useDeleteBrand();
    const deleteUser = useDeleteDependsUsers();

    const toggleBrand = useCallback((brandId: number) => {
        setExpandedBrands(prev => 
            prev.includes(brandId) 
                ? prev.filter(id => id !== brandId)
                : [...prev, brandId]
        );
    }, []);

    const handleDeleteBrand = useCallback(async (brandId: number) => {
        if (window.confirm('정말로 이 브랜드를 삭제하시겠습니까? 관련된 모든 사용자 계정도 함께 삭제됩니다.')) {
            try {
                await deleteBrand.mutateAsync(brandId);
                alert('브랜드가 성공적으로 삭제되었습니다.');
                refetch();
            } catch (error) {
                console.error('브랜드 삭제 중 오류 발생: ', error);
                alert('브랜드 삭제 중 오류가 발생했습니다.');
            }
        }
    }, [deleteBrand, refetch]);

    const handleDeleteUser = useCallback(async (userId: number) => {
        if (window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
            try {
                await deleteUser.mutateAsync(userId);
                alert('사용자가 성공적으로 삭제되었습니다.');
                queryClient.invalidateQueries({ queryKey: [ALL_USERS_QUERY_KEY] });
                queryClient.invalidateQueries({ queryKey: [ALL_BRAND_QUERY_KEY] });
                // 브랜드 목록 리프레시
                refetch();
            } catch (error) {
                console.error('사용자 삭제 중 오류 발생: ', error);
                alert('사용자 삭제 중 오류가 발생했습니다.');
            }
        } else {
            alert('관리자가 취소하였습니다.');
        }
    }, [deleteUser, queryClient, refetch]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={styles.tableContainer}>
            <table className={styles.userTable}>
                <thead>
                    <tr>
                        <th>Brand ID</th>
                        <th>판매사 이름</th>
                        <th>사업자등록번호</th>
                        <th>권한</th>
                        <th>멤버</th>
                        <th>액션</th>
                    </tr>
                </thead>
                <tbody>
                    {brands?.map((brand: BrandInfo) => (
                        <React.Fragment key={brand.brandId}>
                            <tr>
                                <td>{brand.brandId}</td>
                                <td>{brand.brandName}</td>
                                <td>{brand.companyId}</td>
                                <td>{brand.roles.join(', ')}</td>
                                <td>
                                    <button 
                                        className={styles.actionButton}
                                        onClick={() => toggleBrand(brand.brandId)}
                                    >
                                        {expandedBrands.includes(brand.brandId) ? '멤버 숨기기' : '멤버 보이기'}
                                    </button>
                                </td>
                                <td>
                                    <button 
                                        className={styles.deleteButton}
                                        onClick={() => handleDeleteBrand(brand.brandId)}
                                    >
                                        삭제
                                    </button>
                                </td>
                            </tr>
                            {expandedBrands.includes(brand.brandId) && (
                                <tr>
                                    <td colSpan={5}>
                                        <table className={styles.userTable}>
                                            <thead>
                                                <tr>
                                                    <th>User ID</th>
                                                    <th>이메일</th>
                                                    <th>이름</th>
                                                    <th>액션</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {brand.users.map((user: UserInfoDTO) => (
                                                    <tr key={user.userId}>
                                                        <td>{user.userId}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.name}</td>
                                                        <td>
                                                            <button className={styles.deleteButton} onClick={() => handleDeleteUser(user.userId)}>
                                                                삭제
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <div className={styles.buttonContainer}>
                <LinkBtnShared 
                    href="/brand/products" 
                    variant="solid" 
                    color="primary"
                    className={styles.sellerManagementButton}
                >
                    물건 리스트
                </LinkBtnShared>
            </div>
        </div>
    );
};

export default BrandList;
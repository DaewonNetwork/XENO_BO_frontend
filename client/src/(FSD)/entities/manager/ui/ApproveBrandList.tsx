"use client";

import React, { useCallback } from "react";
import { ALL_WAITINGBRAND_QUERY_KEY, useGetAllBrandApproves } from "../api/useGetAllBrandApproves";
import { useApprovalBrand } from "../api/useApproveBrand";
import styles from '@/(FSD)/shareds/styles/UserList.module.scss';
import { useQueryClient } from "@tanstack/react-query";

const ApproveBrandList = () => {
    const queryClient = useQueryClient();
    const { data, isPending, error } = useGetAllBrandApproves();
    const approveBrand = useApprovalBrand();

    const handleApproveBrand = useCallback(async (approveId: number) => {
        if (window.confirm('해당 판매사 가입을 승인하시겠습니까?')) {
            try {
                await approveBrand.mutateAsync(approveId);
                alert('판매사가 성공적으로 가입 승인되었습니다.');
                queryClient.invalidateQueries({ queryKey: [ALL_WAITINGBRAND_QUERY_KEY] });
            } catch (error) {
                console.error('가입 승인 중 오류 발생: ', error);
                alert('가입 승인 중 오류가 발생했습니다.');
            }
        } else {
            alert('관리자가 취소하였습니다.');
        }
    }, [approveBrand, queryClient]);

    if (error) return <>Error: {error.message}</>
    if (isPending) return <>Loading...</>

    return (
        <>
            <div className={styles.tableContainer}>
                <table className={styles.userTable}>
                    <thead>
                        <tr>
                            <th>Approve Id</th>
                            <th>브랜드 이름</th>
                            <th>사업자등록번호</th>
                            <th>이메일</th>
                            <th>이름</th>
                            <th>전화번호</th>
                            <th>주소</th>
                            <th>상태</th>
                            <th>액션</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((brand) => (
                            <tr key={brand.id}>
                                <td>{brand.id}</td>
                                <td>{brand.brandName}</td>
                                <td>{brand.companyId}</td>
                                <td>{brand.email}</td>
                                <td>{brand.name}</td>
                                <td>{brand.phoneNumber}</td>
                                <td>{brand.address}</td>
                                <td>{brand.status}</td>
                                <td>
                                    <button className={styles.deleteButton} onClick={() => handleApproveBrand(brand.id)}>
                                        가입 승인
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ApproveBrandList;
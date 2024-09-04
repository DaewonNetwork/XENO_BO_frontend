import React, { useState } from 'react';
import { usePointUpdateUser } from '@/(FSD)/entities/manager/api/usePointUpdateUser';
import { UserCustomerInfo } from '@/(FSD)/shareds/types/manager/UserCustomerInfo.type';
import styles from '@/(FSD)/shareds/styles/Modal.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import { ALL_USERS_QUERY_KEY } from '../api/useGetAllUsers';

interface PointAdjustmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: () => void;
    user: UserCustomerInfo;
}

const PointAdjustmentModal = ({ isOpen, onClose, onUpdate, user }: PointAdjustmentModalProps) => {
    const [newPoint, setNewPoint] = useState<number>(user.point || 0);
    const { updatePoint } = usePointUpdateUser();
    const queryClient = useQueryClient();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await updatePoint({ userId: user.userId, newPoint });
            console.log('Update result:', result);  // 결과 로깅
            alert('적립금이 성공적으로 업데이트되었습니다.');
            // queryClient.invalidateQueries({ queryKey: [ALL_USERS_QUERY_KEY] });
            onUpdate();
            onClose();
        } catch (error) {
            console.error('적립금 업데이트 중 오류 발생:', error);
            if (error instanceof Error) {
                alert(`적립금 업데이트 중 오류 발생: ${error.message}`);
            } else {
                alert('적립금 업데이트 중 알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>적립금 수정</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        value={newPoint}
                        onChange={(e) => setNewPoint(Number(e.target.value))}
                        min="0"
                    />
                    <button type="submit">확인</button>
                    <button type="button" onClick={onClose}>취소</button>
                </form>
            </div>
        </div>
    );
};

export default PointAdjustmentModal;
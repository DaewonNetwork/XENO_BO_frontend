// import { useLevelUpdateUser } from '../api/useLevelUpdateUser';
// import React, { useState } from 'react';
// import styles from '@/(FSD)/shareds/styles/Modal.module.scss';
// import { UserCustomerInfo } from '@/(FSD)/shareds/types/manager/UserCustomerInfo.type';

// interface LevelAdjustmentModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onUpdate: () => void;
//     user: UserCustomerInfo;
// }

// const LevelAdjustmentModal = ({ isOpen, onClose, onUpdate, user }: LevelAdjustmentModalProps) => {
//     const [newLevel, setNewLevel] = useState<string>(user.level || '');
//     const { updateLevel } = useLevelUpdateUser();

//     if (!isOpen) return null;

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             await updateLevel({ userId: user.userId, newLevel });
//             alert('등급이 성공적으로 업데이트되었습니다.');
//             onUpdate();
//             onClose();
//         } catch (error) {
//             console.error('등급 업데이트 중 오류 발생:', error);
//             alert(error instanceof Error ? error.message : '등급 업데이트 중 알 수 없는 오류가 발생했습니다.');
//         }
//     };

//     return (
//         <div className={styles.modalOverlay}>
//             <div className={styles.modalContent}>
//                 <h2>등급 수정</h2>
//                 <form onSubmit={handleSubmit}>
//                     <select
//                         value={newLevel}
//                         onChange={(e) => setNewLevel(e.target.value)}
//                     >
//                         <option value="BRONZE">BRONZE</option>
//                         <option value="SILVER">SILVER</option>
//                         <option value="GOLD">GOLD</option>
//                         <option value="GOLD">VIP</option>
//                     </select>
//                     <button type="submit">확인</button>
//                     <button type="button" onClick={onClose}>취소</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default LevelAdjustmentModal;

// import React, { useState } from 'react';
// import { useLevelUpdateUser } from '@/(FSD)/entities/manager/api/useLevelUpdateUser';
// import { UserCustomerInfo } from '@/(FSD)/shareds/types/manager/UserCustomerInfo.type';
// import styles from '@/(FSD)/shareds/styles/Modal.module.scss';

// interface LevelAdjustmentModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onUpdate: () => void;
//     user: UserCustomerInfo;
// }

// const LevelAdjustmentModal = ({ isOpen, onClose, onUpdate, user }: LevelAdjustmentModalProps) => {
//     const [newLevel, setNewLevel] = useState<string>(user.level || '');
//     const { updateLevel } = useLevelUpdateUser();
//     const [isUpdating, setIsUpdating] = useState(false);

//     if (!isOpen) return null;

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsUpdating(true);
//         try {
//             await updateLevel({ userId: user.userId, newLevel });
//             alert('등급이 성공적으로 업데이트되었습니다.');
//             onUpdate();
//             onClose();
//         } catch (error) {
//             console.error('등급 업데이트 중 오류 발생:', error);
//             alert(error instanceof Error ? error.message : '등급 업데이트 중 알 수 없는 오류가 발생했습니다.');
//         } finally {
//             setIsUpdating(false);
//         }
//     };

//     return (
//         <div className={styles.modalOverlay}>
//             <div className={styles.modalContent}>
//                 <h2>등급 수정</h2>
//                 <form onSubmit={handleSubmit}>
//                     <select
//                         value={newLevel}
//                         onChange={(e) => setNewLevel(e.target.value)}
//                         disabled={isUpdating}
//                     >
//                         <option value="BRONZE">BRONZE</option>
//                         <option value="SILVER">SILVER</option>
//                         <option value="GOLD">GOLD</option>
//                         <option value="VIP">VIP</option>
//                     </select>
//                     <button type="submit" disabled={isUpdating}>
//                         {isUpdating ? '처리 중...' : '확인'}
//                     </button>
//                     <button type="button" onClick={onClose} disabled={isUpdating}>
//                         취소
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default LevelAdjustmentModal;

import React, { useState } from 'react';
import { useLevelUpdateUser } from '@/(FSD)/entities/manager/api/useLevelUpdateUser';
import { UserCustomerInfo } from '@/(FSD)/shareds/types/manager/UserCustomerInfo.type';
import styles from '@/(FSD)/shareds/styles/Modal.module.scss';

interface LevelAdjustmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: () => void;
    user: UserCustomerInfo;
}

const LevelAdjustmentModal = ({ isOpen, onClose, onUpdate, user }: LevelAdjustmentModalProps) => {
    const [newLevel, setNewLevel] = useState<string>(user.level || '');
    const { updateLevel } = useLevelUpdateUser();
    const [isUpdating, setIsUpdating] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            await updateLevel({ userId: user.userId, newLevel });
            alert('등급이 성공적으로 업데이트되었습니다.');
            onUpdate();
            onClose();
        } catch (error) {
            console.error('등급 업데이트 중 오류 발생:', error);
            alert(error instanceof Error ? error.message : '등급 업데이트 중 알 수 없는 오류가 발생했습니다.');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>등급 수정</h2>
                <form onSubmit={handleSubmit}>
                    <select
                        value={newLevel}
                        onChange={(e) => setNewLevel(e.target.value)}
                        disabled={isUpdating}
                    >
                        <option value="BRONZE">BRONZE</option>
                        <option value="SILVER">SILVER</option>
                        <option value="GOLD">GOLD</option>
                        <option value="VIP">VIP</option>
                    </select>
                    <button type="submit" disabled={isUpdating}>
                        {isUpdating ? '처리 중...' : '확인'}
                    </button>
                    <button type="button" onClick={onClose} disabled={isUpdating}>
                        취소
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LevelAdjustmentModal;
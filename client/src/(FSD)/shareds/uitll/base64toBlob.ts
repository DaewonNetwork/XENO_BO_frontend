export async function fetchImageToBlob(imageURL: string): Promise<Blob> {
    try {
        // 이미지 URL에서 데이터 가져오기
        const response = await fetch(imageURL, {
            method: 'GET',
            mode: 'cors'
        })

        // 응답 상태 확인
        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }

        // 응답의 Blob 데이터 반환
        return await response.blob();
    } catch (error) {
        console.error('Error fetching image to Blob:', error);
        throw error;
    }
}

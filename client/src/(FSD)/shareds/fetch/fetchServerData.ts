import { apiPath } from "./APIpath";

interface fetchServerDataType {
    path: string;
}

export const fetchServerData = async ({ path, }: fetchServerDataType) => {
    const response = await fetch(`${apiPath}${path}`);
    
    const data = response.json();

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    };

    return data;
} 
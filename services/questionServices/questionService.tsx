import apiClient from "../utils/apiClient"

export const getAllQuestionByUserId = async (userId: number) => {
    try {
        const response = await apiClient.get(`/question/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};
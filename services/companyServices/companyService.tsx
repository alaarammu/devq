import apiClient from "../utils/apiClient"

export const getAllUsersByCompanyId = async (companyId: any) => {
    try {
        const response = await apiClient.get(`/company/${companyId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};
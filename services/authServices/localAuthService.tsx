import apiClient from "../utils/apiClient"


export const createCompany = async (companyData: { name: string; email: string }) => {
    try {
        const response = await apiClient.post('/company', companyData);
        return response.data;
    } catch (error) {
        console.error('Error creating company:', error);
        throw error;
    }
};


export const getUserDetails = async (userData: { email: string; }) => {
    try {
        console.log("email", userData.email)
        const response = await apiClient.post('/user/find-by-email', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating company:', error);
        throw error;
    }
};
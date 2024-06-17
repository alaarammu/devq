import axios from 'axios';
import { getAccessToken } from '../utils/getAccessToken';
import { UserData } from '../../types/auth';
import useAuthStore from '../utils/authStore'; // import useAuthStore
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loginWithEmailPassword = async (email: any, password: any) => {
    try {
        const response = await axios.post(`https://${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/oauth/token`, {
            grant_type: 'password',
            username: email,
            password: password,
            audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
            client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
            scope: 'openid profile email'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const authResult = response.data;
        useAuthStore.getState().setAccess(authResult);
        console.log("result", authResult)
        // Confirm access token is set
        const accessToken = useAuthStore.getState().access;
        if (accessToken) {
            console.log("Access token is set:", accessToken);
        } else {
            console.log("Access token is not set");
        }
        return authResult;
    } catch (error: any) {
        if (error.response) {
            toast.error(error.response.data.error_description);
            console.error('Auth0 login error:', error.response.data);
        } else if (error.request) {
            toast.error(error.request);
            console.error('No response received:', error.request);
        } else {
            toast.error(error.message);
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};

const createUserAndAssignRole = async (userData: UserData, roleId: string) => {
    const token = await getAccessToken();
    console.log("token", token);
    console.log("userData", userData);

    try {
        // Step 1: Create the user
        const userResponse = await axios.post(`https://${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/users`, userData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        let result: any = loginWithEmailPassword(userData.email, userData.password)

        if (result) {
            const userId = userResponse.data.user_id;


            await axios.post(`https://${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}/roles`,
                { roles: [roleId] }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('User created:', roleId);
        }
        else {
            toast.error("Access token is not available after user creation.");
            throw new Error("Access token is not available after user creation.");
        }

        return result;
    } catch (error: any) {
        toast.error(error.response.data.message);
        console.error('Error creating user or assigning role:', error.response ? error.response.data : error.message);
        throw error;
    }
};
const createNewUserAndAssignRole = async (userData: UserData, roleId: string) => {
    const token = await getAccessToken();
    console.log("token", token);
    console.log("userData", userData);

    try {
        // Step 1: Create the user
        const userResponse = await axios.post(`https://${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/users`, userData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });


        const userId = userResponse.data.user_id;


        const result = await axios.post(`https://${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}/roles`,
            { roles: [roleId] }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('User created:', roleId);



        return result;
    } catch (error: any) {
        toast.error(error.response.data.message);
        console.error('Error creating user or assigning role:', error.response ? error.response.data : error.message);
        throw error;
    }
};
export { loginWithEmailPassword, createUserAndAssignRole, createNewUserAndAssignRole };
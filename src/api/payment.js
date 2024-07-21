import { postRequest } from "./api";

export async function createPost(amount) {
    try {
        const response = await postRequest('api/create-order/', {amount}, {}, true);
        return { status: true, message: "Post created", data: response};
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export async function requestPayment(applicationId, amount){
    try {
        const response = await postRequest(`api/applications/${applicationId}/request_payment/`, {amount}, {}, true);
        return { status: true, message: "Payment Requested", data: response};
    }
    catch (error) {
        return { status: false, message: error.message };
    }
}

        export async function acceptPayment(applicationId){
            try {
                const response = await postRequest(`api/applications/${applicationId}/accept_payment/`,{},{}, true);
                return { status: true, message: "Payment Requested", data: response};
            }
            catch (error) {
                return { status: false, message: error.message };
            }
        }
import { postRequest } from "./api";

export async function createPost(amount) {
    try {
        const response = await postRequest('api/create-order/', {amount}, {}, true);
        return { status: true, message: "Post created", data: response};
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export async function requestPaymnt(applicationId, amount){
    try {
        const response = await postRequest(`api/applications/${applicationId}/request-payment/`, {amount}, {}, true);
        return { status: true, message: "Payment Requested", data: response};
    }
    catch (error) {
        return { status: false, message: error.message };
    }
}

export async function acceptPaymnt(applicationId,){
    try {
        const response = await postRequest(`api/applications/${applicationId}/request-payment/`, {}, true);
        return { status: true, message: "Payment Requested", data: response};
    }
    catch (error) {
        return { status: false, message: error.message };
    }
}
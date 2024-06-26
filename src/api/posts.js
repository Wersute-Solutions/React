import { getRequest, postForm, postRequest,  } from "./api";

export async function createPost(postData) {
    try {
        const response = await postForm('api/posts/', postData, {}, true);
        return { status: true, message: "Post created", data: response};
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export async function fetchPosts(cursor = '') {
    try {
        const url = cursor ? `api/posts/?cursor=${cursor}` : 'api/posts/';
        const response = await getRequest(url, {}, {}, true);
        return { status: true, data: response };
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export async function applyToPost(postId, coverLetter) {
    try {
        const data = {
            "cover_letter": coverLetter || "",
        }
        const response = await postRequest(`api/posts/${postId}/apply/`, data, {}, true);
        return { status: true, message: "Applied to post", data: response};
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export async function fetchMyPosts() {
    try {
        const response = await getRequest('api/user-posts/', {}, {}, true);
        return { status: true, data: response};
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export async function acceptApplication(applicationId, user_id) {
    try {
        const data = {
            "assigned_to": user_id
        }
        const response = await postRequest(`api/applications/${applicationId}/accept/`, data, {}, true);
        return { status: true, message: "Accepted application", data: response};
    }
    catch (error) {
        return { status: false, message: error.message };
    }
}   

export async function fetchMyApplications(){
    try{
        const response = await getRequest('api/applications/', {}, {}, true);
        return { status: true, data: response};
    }
    catch(error){
        return { status: false, message: error.message };

    }
}
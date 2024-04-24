import { getRequest, postForm, postRequest,  } from "./api";

export async function createPost(postData) {
    try {
        const response = await postForm('api/posts/', postData, {}, true);
        return { status: true, message: "Post created", data: response};
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export async function fetchPosts() {
    try {
        const response = await getRequest('api/posts/', {}, {}, true);
        return { status: true, data: response.results};
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

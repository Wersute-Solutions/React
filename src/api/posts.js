import { getRequest, postForm,  } from "./api";

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
        return { status: true, data: response};
    } catch (error) {
        return { status: false, message: error.message };
    }
}


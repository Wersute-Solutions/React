import { putRequest, postRequest, postForm, getRequest } from "./api";

export async function updateProfile(data) {
    return await postForm("api/user/profiles/", data, {}, true);
}

export async function fetchProfile(id) {
    if (id === null) {
        return await getRequest(`api/user/profiles/`, {}, {}, true);
    }
    return await getRequest(`api/user/profiles/?id=id`, {}, {}, true);
}
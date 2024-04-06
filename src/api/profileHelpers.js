import { putRequest, postRequest, postForm } from "./api";

export async function updateProfile(data) {
    return await postForm("api/user/profiles/", data, {}, true);
}
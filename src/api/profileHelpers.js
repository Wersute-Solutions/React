import { putRequest, postRequest, postForm, getRequest } from "./api";

export async function updateProfile(data) {
    return await postForm("api/user/profiles/", data, {}, true);
}

export async function fetchProfile(id) {
    if (id === undefined) {
        return await getRequest(`api/user/profiles/`, {}, {}, true);
    }
    return await getRequest(`api/user/profiles/?id=${id}`, {}, {}, true);
}


export async function fetchBusiness(){
    try{
        const response = await getRequest('api/buisnessprofession/',{},{},true);
        return { status: true, data: response};
    }
    catch(error){
        return { status: false, message: error.message };

    }

}
export async function fetchskills(){
    try{
        const response = await getRequest('api/skills/', {}, {}, true);
        return { status: true, data: response};
    }
    catch(error){
        return { status: false, message: error.message };

    }
}
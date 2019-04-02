import axios from 'axios';
const apiBaseUrl = '';
const instance = axios.create({
    baseURL: apiBaseUrl,
    timeout: 20000,
    headers: {Accept: 'application/json'},
});

instance.interceptors.request.use((configData) => {
    console.log('console log for chrom config', configData);
return configData;
}, (error) => {
    console.log('console log for chrom error', error);
    return Promise.reject(error);
});
// 500 网络异常，请稍后再试    Network anomalies, please try again later.
// 返回拦截处理
instance.interceptors.response.use((response) => {
    console.log('console log for chrom response', response);
// 对响应数据做点什么
return response;
}, (error) => {
    console.log('console log for chrom responseerror', error.response);
    return Promise.reject(error.response);
});

export const Net = async (type, api, params) => {
    if (type === 'post') {
        return new Promise((resolve, reject) => {
            instance.post(api, params)
            .then((res) => {
            resolve(res);
    })
    .catch((error) => {
            reject(error);
    });
    });
    }
    if (type === 'get') {
        api += '?';
        for (const key in params) {
            const element = params[key];
            api = `${api + key}=${element}&`;
        }
        return new Promise((resolve, reject) => {
            instance.get(api, params)
            .then((res) => {
            resolve(res);
    })
    .catch((error) => {
            reject(error);
    });
    });
    }
    if (type === 'put') {
        return new Promise((resolve, reject) => {
            instance.put(api, params)
            .then((res) => {
            resolve(res);
    })
    .catch((error) => {
            reject(error);
    });
    });
    }
    if (type === 'delete') {
        return new Promise((resolve, reject) => {
            instance.delete(api, params)
            .then((res) => {
            resolve(res);
    })
    .catch((error) => {
            reject(error);
    });
    });
    }
    return null;
};

import axios from 'axios';
import qs from 'qs';
const apiBaseUrl = 'http://39.105.101.248:86';
const instance = axios.create({
    baseURL: apiBaseUrl,
    timeout: 20000,
    headers: { Accept: 'application/json' },
});

instance.interceptors.request.use((config) => {
    config.data = config.data;
    config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    console.log('console log for chrom config', config);
    return config;
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

export const Net = async ({api, params, type='post'}) => {
    let storage = window.localStorage;
    let token = storage.getItem('token');
    console.log('------------ token',token);
    axios.defaults.headers.common['token'] = token;
    if (type === 'post') {
        return new Promise((resolve, reject) => {
            instance.post(api, qs.stringify(params))
                .then((res) => {
                    if(res.data.code === '0'){
                        resolve(res.data);
                    }else{
                        reject(res.data);
                    }
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

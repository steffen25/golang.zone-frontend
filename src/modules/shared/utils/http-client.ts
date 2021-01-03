import axios, {
    AxiosError,
    AxiosInstance,
    AxiosPromise,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios'
import { StatusCodes } from 'http-status-codes'
import { useAuthStore } from '@/modules/user/store/auth.store'
import { createPinia } from 'pinia'

const pinia = createPinia()

class HttpClient {
    private readonly axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            //baseURL: 'https://golang.zone/api/v1/',
            baseURL: 'http://127.0.0.1:8080/api/v1/',
            withCredentials: true,
        })

        this.axiosInstance.interceptors.response.use(
            async (response: AxiosResponse) => {
                const authStore = useAuthStore(pinia)

                if (response?.status === StatusCodes.UNAUTHORIZED) {
                    // logout user if attempt of renewal of access token fails
                    await authStore.refreshToken()

                    return Promise.resolve(response)
                }

                return Promise.resolve(response)
            },
            (error: AxiosError) => {
                if (axios.isCancel(error)) {
                    return Promise.reject(error)
                }

                return Promise.reject(error)
            },
        );
    }

    public getRawInstance(): AxiosInstance
    {
        return this.axiosInstance;
    }

    public head<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): AxiosPromise<R>
    {
        return this.axiosInstance.head(url, config)
    }

    public get<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): AxiosPromise<R>
    {
        return this.axiosInstance.get(url, config)
    }

    public post<T, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<R>
    {
        return this.axiosInstance.post(url, data, config)
    }

    public put<T, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<R>
    {
        return this.axiosInstance.put(url, data, config)
    }

    public patch<T, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<R>
    {
        return this.axiosInstance.patch(url, data, config)
    }

    public delete<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): AxiosPromise<R>
    {
        return this.axiosInstance.delete(url, config)
    }
}

const httpClient: HttpClient = new HttpClient();

export { httpClient };

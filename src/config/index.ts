
export type Config = {
    apiUrl: string;
}

const config = {
    apiUrl: process.env.REACT_APP_API_URL,
} as Config;

export default config;
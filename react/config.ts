import globalConfig, { GlobalConfig } from '../config.global'

interface Config extends GlobalConfig {
    url: string,
    file: string
}

const config = configGenerate();
function configGenerate(){
    if (process.env.NODE_ENV == 'development') {
        return {
            ...globalConfig,
        };
    }

    if (process.env.NODE_ENV == 'production') {
        return {
            ...globalConfig,
        };
    }
}

export default config as Config;
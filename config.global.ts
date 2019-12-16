export interface GlobalConfig{
    apiPort: number,
    host: string | undefined,
}

let globalConfig: GlobalConfig =  {
    apiPort: 3001,
    host: 'localhost',
}

if(process.env.NODE_ENV == 'development'){
    globalConfig = {
        ...globalConfig,

    }
}

if(process.env.NODE_ENV == 'production'){
    globalConfig = {
        ...globalConfig,

    }
}

export default globalConfig 
import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { log } from "console";

export function getEnv(env: string) {
    if (fs.existsSync(env)) {
        return dotenv.parse(fs.readFileSync(env))
    }

}
export function getMergeEnvConfig() {
    const defaultEnv = getEnv('.env')
    const configEnv = getEnv(`.env.${process.env.NODE_ENV || `development`}`)
    const config = { ...defaultEnv, ...configEnv }
    console.log('数据库配置信息',config)
    return {
        type: config['DB_TYPE'],
        host: config['DB_HOST'],
        port: config['DB_PORT'],
        username: config['DB_USERNAME'],
        password: config['DB_PASSWORD'],
        database: config['DB_DATABASE'],
        entities: [__dirname+'/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize:true
    } as TypeOrmModuleOptions;
}
export default new DataSource({ ...getMergeEnvConfig() } as DataSourceOptions)
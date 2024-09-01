import { Connection } from './src/configs/connection';
import { Crypto } from './src/configs/crypto';
import { Jwt } from './src/configs/jwt';

declare global {
    namespace Express {
        export interface Request {
            conn: Connection,
            cryto: Crypto,
            jwt: Jwt,
            decoded: any
        }
    }
}
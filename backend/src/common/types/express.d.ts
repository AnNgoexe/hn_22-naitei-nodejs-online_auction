import { AccessTokenPayload } from '@common/types/token-payload.interface';

declare module 'express' {
  export interface Request {
    user?: AccessTokenPayload;
  }
}

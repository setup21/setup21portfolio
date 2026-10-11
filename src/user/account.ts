import { Router, Request, Response } from 'express';
import { failresponse } from '../../responseWrapper';
const router = Router();
router.post('/register', (_req: Request, res: Response) => failresponse(res, 501, '회원가입 기능은 아직 구현되지 않았습니다.'));
router.post('/login', (_req: Request, res: Response) => failresponse(res, 501, '로그인 기능은 아직 구현되지 않았습니다.'));
export default router;

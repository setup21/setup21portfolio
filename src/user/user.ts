import { Router, Request, Response } from 'express';
import { failresponse } from '../../responseWrapper';
const router = Router();
router.get('/my', (_req: Request, res: Response) => failresponse(res, 501, '사용자 API는 아직 구현되지 않았습니다.'));
export default router;

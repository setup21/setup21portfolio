import { Router, Request, Response } from 'express';
import { successresponse } from '../../responseWrapper';
const router = Router();
router.get('/health', (_req: Request, res: Response) => successresponse(res, { status: 'ok' }));
export default router;

import { Router, Request, Response } from 'express';
import { successresponse } from '../../responseWrapper';

const router = Router();

/**
 * @swagger
 * /webapp/health:
 *   get:
 *     summary: 서버 생존 상태 확인
 *     tags: [Webapp]
 *     responses:
 *       200:
 *         description: 서버가 요청을 처리할 수 있습니다.
 */
router.get('/health', (_req: Request, res: Response) => successresponse(res, { status: 'ok' }));

/**
 * @swagger
 * /webapp/maintance:
 *   get:
 *     summary: 서버 점검 상태 확인
 *     description: 점검 중이면 true, 아니면 false를 반환합니다. MAINTENANCE 환경변수 또는 기존 maintance 환경변수를 사용합니다.
 *     tags: [Webapp]
 *     responses:
 *       200:
 *         description: 점검 여부
 */
router.get('/maintance', (_req: Request, res: Response) => {
  const maintenance = process.env.MAINTENANCE ?? process.env.maintance;
  successresponse(res, maintenance?.trim().toLowerCase() === 'true');
});

/**
 * @swagger
 * /webapp/version:
 *   get:
 *     summary: 서버 버전 확인
 *     description: SERVER_VERSION 환경변수 또는 기존 version 환경변수의 값을 반환합니다.
 *     tags: [Webapp]
 *     responses:
 *       200:
 *         description: 서버 버전
 */
router.get('/version', (_req: Request, res: Response) => {
  const version = process.env.SERVER_VERSION ?? process.env.version ?? process.env.npm_package_version;
  successresponse(res, version);
});

export default router;

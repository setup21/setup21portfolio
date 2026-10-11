import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../modelsindex';
import { JWT_SECRET } from '../../config';
import { failresponse, successresponse } from '../../responseWrapper';

const router = Router();

/**
 * @swagger
 * /account/register:
 *   post:
 *     summary: Create an account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username: { type: string, example: player1 }
 *               password: { type: string, example: example-password }
 *     responses:
 *       200: { description: Account created }
 *       400: { description: Username or password is missing }
 *       409: { description: Username is already in use }
 */
router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body ?? {};
  if (typeof username !== 'string' || !username.trim() || typeof password !== 'string' || !password) {
    return failresponse(res, 400, '아이디와 비밀번호를 입력해 주세요.');
  }

  try {
    const user = new User({ username: username.trim(), password });
    await user.save();
    return successresponse(res, '회원 가입 성공!');
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return failresponse(res, 409, '이미 사용 중인 아이디입니다.');
    }
    console.error('Registration error:', error);
    return failresponse(res, 500, '회원가입 중 서버 오류가 발생했습니다.');
  }
});

/**
 * @swagger
 * /account/login:
 *   post:
 *     summary: Login and receive a JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username: { type: string, example: player1 }
 *               password: { type: string, example: example-password }
 *     responses:
 *       200:
 *         description: status 1 means success, -1 means username not found, -2 means password mismatch
 *       400: { description: Username or password is missing }
 *       500: { description: Server configuration or internal error }
 */
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body ?? {};
  if (typeof username !== 'string' || !username.trim() || typeof password !== 'string' || !password) {
    return failresponse(res, 400, '아이디와 비밀번호를 입력해 주세요.');
  }

  if (!JWT_SECRET) {
    return failresponse(res, 500, 'JWT_SECRET 환경 변수가 설정되지 않았습니다.');
  }

  try {
    const user = await User.findOne({ username: username.trim() });
    if (!user) return successresponse(res, { status: -1, token: '' });

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) return successresponse(res, { status: -2, token: '' });

    const token = jwt.sign(
      { id: user._id.toString(), username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    return successresponse(res, { status: 1, token });
  } catch (error: unknown) {
    console.error('Login error:', error);
    return failresponse(res, 500, '로그인 중 서버 오류가 발생했습니다.');
  }
});

export default router;

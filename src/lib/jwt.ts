import jwt from 'jsonwebtoken';

interface Payload {
  id: string;
  email: string;
  role: string;
}

export function signJwt(payload: Payload) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' });
}

export function verifyJwt(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}

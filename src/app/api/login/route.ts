import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user =
    email === 'admin@example.com' && password === 'admin123'
      ? { id: 1, email, role: 'admin' }
      : email === 'user@example.com' && password === 'user123'
      ? { id: 2, email, role: 'user' }
      : null;

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: '1d' });

  const response = NextResponse.json({ message: 'Login success' });
  response.headers.set(
    'Set-Cookie',
    serialize('auth_token', token, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
    })
  );

  return response;
}

// app/api/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import registerSchema from '@/validations/auth/register.validation';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

const fakeDb: User[] = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.parse(body);

    const userExists = fakeDb.find((u) => u.email === parsed.email);
    if (userExists) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(parsed.password, 10);

    const newUser: User = {
      id: Date.now().toString(),
      name: parsed.name,
      email: parsed.email,
      password: hashedPassword,
    };

    fakeDb.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: 'user' },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({ message: 'Registered successfully' });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}

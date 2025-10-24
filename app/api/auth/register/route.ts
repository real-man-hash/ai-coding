import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/connection';
import { users } from '@/lib/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    console.log('Registration request received');
    const { name, email, password } = await request.json();
    console.log('Parsed data:', { name, email, password: password ? '***' : 'missing' });

    // Validate input
    if (!name || !email || !password) {
      console.log('Validation failed: missing required fields');
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      console.log('Validation failed: password too short');
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    console.log('Checking if user exists...');
    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      console.log('User already exists');
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    console.log('Hashing password...');
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    console.log('Creating user in database...');
    // Create user
    const newUser = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      experienceLevel: 'beginner', // Default experience level
    });

    console.log('User created successfully:', newUser);
    return NextResponse.json(
      { message: 'User created successfully', userId: newUser.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

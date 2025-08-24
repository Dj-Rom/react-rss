import { describe, it, expect } from 'vitest';
import { loginSchema } from '../../utils/validationSchemas.ts';

describe('loginSchema validation', () => {
  it('passes with valid email and password', async () => {
    const validData = {
      email: 'aleh@example.com',
      password: 'secure123',
    };

    await expect(loginSchema.validate(validData)).resolves.toEqual(validData);
  });

  it('fails with invalid email format', async () => {
    const invalidEmail = {
      email: 'not-an-email',
      password: 'secure123',
    };

    await expect(loginSchema.validate(invalidEmail)).rejects.toThrow(
      'Please enter a valid email address'
    );
  });

  it('fails when email is missing', async () => {
    const missingEmail = {
      password: 'secure123',
    };

    await expect(loginSchema.validate(missingEmail)).rejects.toThrow(
      'Email is required'
    );
  });

  it('fails when password is too short', async () => {
    const shortPassword = {
      email: 'aleh@example.com',
      password: '123',
    };

    await expect(loginSchema.validate(shortPassword)).rejects.toThrow(
      'Password must be at least 6 characters long'
    );
  });

  it('fails when password is missing', async () => {
    const missingPassword = {
      email: 'aleh@example.com',
    };

    await expect(loginSchema.validate(missingPassword)).rejects.toThrow(
      'Password is required'
    );
  });
});

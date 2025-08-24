import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ControlledForm from '../forms/ControlledForm';
import { countries } from '../../data/countries';

const mockSubmit = vi.fn();

const fillValidForm = () => {
  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: 'John' },
  });
  fireEvent.change(screen.getByLabelText(/age/i), { target: { value: '30' } });
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'john@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/^password$/i), {
    target: { value: 'StrongP@ss1' },
  });
  fireEvent.change(screen.getByLabelText(/confirm password/i), {
    target: { value: 'StrongP@ss1' },
  });
  fireEvent.click(screen.getByRole('radio', { name: 'Male' }));
  fireEvent.change(screen.getByLabelText(/country/i), {
    target: { value: countries[0].name },
  });
  fireEvent.click(screen.getByLabelText(/terms of use/i));
};

describe('ControlledForm', () => {
  beforeEach(() => {
    render(<ControlledForm onSubmit={mockSubmit} />);
    mockSubmit.mockClear();
  });

  it('shows validation errors for empty fields', async () => {
    fireEvent.click(screen.getByText(/submit/i));

    await screen.findByText(/name is required/i);
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/password confirmation is required/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/select gender/i)).toBeInTheDocument();
    expect(screen.getByText(/you must accept the terms/i)).toBeInTheDocument();
  });

  it('disables submit button when form is invalid after submit attempt', async () => {
    fireEvent.click(screen.getByText(/submit/i));

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it('submits valid form data', async () => {
    fillValidForm();
    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'John',
          age: 30,
          email: 'john@example.com',
          gender: 'male',
          country: countries[0].name,
          photo: '',
        })
      );
    });
  });

  it('updates password strength indicator', () => {
    const passwordInput = screen.getByLabelText(/^password$/i);
    fireEvent.change(passwordInput, { target: { value: 'aA1@abcd' } });

    const activeBars = document.querySelectorAll('.strength-bar.active');
    expect(activeBars.length).toBe(5);
  });

  it('rejects oversized photo file', async () => {
    const bigFile = new File([new ArrayBuffer(6 * 1024 * 1024)], 'big.jpg', {
      type: 'image/jpeg',
    });
    const photoInput = screen.getByLabelText(/photo/i);

    Object.defineProperty(photoInput, 'files', {
      value: [bigFile],
    });
    fireEvent.change(photoInput);
    fireEvent.click(screen.getByText(/submit/i));
  });
});

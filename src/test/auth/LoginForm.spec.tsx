import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';
import { ToastContainer } from 'react-toastify';
import LoginForm from '@/features/auth/LoginForm';
import { useLogin } from '@/services/auth/login.api';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock useLogin hook
jest.mock('@/services/auth/login.api', () => ({
  useLogin: jest.fn(),
}));

describe('LoginForm', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    (useLogin as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    });

    render(
      <>
        <LoginForm />
        <ToastContainer />
      </>
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows validation errors if fields are empty', async () => {
    (useLogin as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    });

    render(<LoginForm />);

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('submits form successfully', async () => {
    const loginMock = jest.fn().mockResolvedValue({
      token: 'mock-token',
    });

    (useLogin as jest.Mock).mockReturnValue({
      mutateAsync: loginMock,
      isPending: false,
    });

    render(
      <>
        <LoginForm />
        <ToastContainer />
      </>
    );

    fireEvent.input(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.input(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(pushMock).toHaveBeenCalledWith('/');
      expect(screen.getByText(/logged in successfully/i)).toBeInTheDocument();
    });
  });

  it('shows error toast on login failure', async () => {
    const loginMock = jest
      .fn()
      .mockRejectedValue(new Error('Invalid credentials'));

    (useLogin as jest.Mock).mockReturnValue({
      mutateAsync: loginMock,
      isPending: false,
    });

    render(
      <>
        <LoginForm />
        <ToastContainer />
      </>
    );

    fireEvent.input(screen.getByPlaceholderText(/email/i), {
      target: { value: 'wrong@example.com' },
    });

    fireEvent.input(screen.getByPlaceholderText(/password/i), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalled();
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('disables button while loading', async () => {
    (useLogin as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: true,
    });

    render(<LoginForm />);

    const button = screen.getByRole('button', { name: /logging in/i });
    expect(button).toBeDisabled();
  });
});

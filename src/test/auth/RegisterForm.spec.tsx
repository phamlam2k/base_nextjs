import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ToastContainer } from 'react-toastify';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import RegisterForm from '@/features/auth/RegisterForm';
import { useRegister } from '@/services/auth/register.api';

// mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// mock register hook
jest.mock('@/services/auth/register.api', () => ({
  useRegister: jest.fn(),
}));

describe('RegisterForm', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    (useRegister as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    });

    render(
      <>
        <RegisterForm />
        <ToastContainer />
      </>
    );

    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/confirm your password/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /register/i })
    ).toBeInTheDocument();
  });

  it('shows validation errors if fields are empty', async () => {
    (useRegister as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    });

    render(<RegisterForm />);

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Name must be at least 2 characters long/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Confirm password is required/i)
      ).toBeInTheDocument();
    });
  });

  it('submits form successfully', async () => {
    const registerMock = jest.fn().mockResolvedValue({
      token: 'mock-token',
    });

    (useRegister as jest.Mock).mockReturnValue({
      mutateAsync: registerMock,
      isPending: false,
    });

    render(
      <>
        <RegisterForm />
        <ToastContainer />
      </>
    );

    fireEvent.input(screen.getByPlaceholderText(/enter your name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.input(screen.getByPlaceholderText(/enter email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.input(screen.getByPlaceholderText(/enter password/i), {
      target: { value: 'password123' },
    });
    fireEvent.input(screen.getByPlaceholderText(/confirm your password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(registerMock).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });
      expect(pushMock).toHaveBeenCalledWith('/');
      expect(screen.getByText(/registered successfully/i)).toBeInTheDocument();
    });
  });

  it('shows error toast on registration failure', async () => {
    const registerMock = jest
      .fn()
      .mockRejectedValue(new Error('Registration failed'));

    (useRegister as jest.Mock).mockReturnValue({
      mutateAsync: registerMock,
      isPending: false,
    });

    render(
      <>
        <RegisterForm />
        <ToastContainer />
      </>
    );

    fireEvent.input(screen.getByPlaceholderText(/enter your name/i), {
      target: { value: 'Bad User' },
    });
    fireEvent.input(screen.getByPlaceholderText(/enter email/i), {
      target: { value: 'bad@example.com' },
    });
    fireEvent.input(screen.getByPlaceholderText(/enter password/i), {
      target: { value: 'badpass' },
    });
    fireEvent.input(screen.getByPlaceholderText(/confirm your password/i), {
      target: { value: 'badpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(registerMock).toHaveBeenCalled();
      expect(screen.getByText(/registration failed/i)).toBeInTheDocument();
    });
  });

  it('disables button while loading', () => {
    (useRegister as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: true,
    });

    render(<RegisterForm />);

    const button = screen.getByRole('button', { name: /registering/i });
    expect(button).toBeDisabled();
  });
});

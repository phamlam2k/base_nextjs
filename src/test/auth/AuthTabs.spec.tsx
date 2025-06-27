import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthTabs from '@/features/auth/AuthTabs';

// mock login
jest.mock('@/services/auth/login.api', () => ({
  useLogin: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
}));

// mock register
jest.mock('@/services/auth/register.api', () => ({
  useRegister: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
}));

// mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('AuthTabs', () => {
  it('renders both tabs', () => {
    render(<AuthTabs />);

    expect(screen.getByRole('tab', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /register/i })).toBeInTheDocument();
  });

  it('shows LoginForm by default', () => {
    render(<AuthTabs />);

    expect(screen.getByPlaceholderText(/enter email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it.skip('switches to RegisterForm on tab click', async () => {
    render(<AuthTabs />);

    fireEvent.click(screen.getByTestId('register-tab'));

    const nameLabel = await screen.findByText(
      (content, element) => element?.textContent?.toLowerCase() === 'name'
    );

    expect(nameLabel).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /register/i })
    ).toBeInTheDocument();
  });
});

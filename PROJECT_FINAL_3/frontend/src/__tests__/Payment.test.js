import { render, screen } from '@testing-library/react';
import PaymentComponent from '../components/PaymentComponent';

test('renders payment options', () => {
  render(<PaymentComponent />);
  const paymentElement = screen.getByText(/Pay Online/i);
  expect(paymentElement).toBeInTheDocument();
});

test('shows PhonePe button', () => {
  render(<PaymentComponent />);
  const phonepeButton = screen.getByText(/PhonePe/i);
  expect(phonepeButton).toBeInTheDocument();
});
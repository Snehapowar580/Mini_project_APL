// Test setup for appointment scheduling application
import '@testing-library/jest-dom';
import 'jest-environment-jsdom';

// Mock localStorage for testing lab appointments
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

// Mock PhonePe SDK
global.PhonePe = {
  PhonePeClient: {
    init: jest.fn(),
    pay: jest.fn()
  }
};

// Mock window.location for payment redirects
delete window.location;
window.location = {
  href: jest.fn(),
  origin: 'http://localhost:5173'
};
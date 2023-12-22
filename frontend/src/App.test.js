import { render, screen } from '@testing-library/react';
import AudioRecorder from './AudioRecorder';

test('renders learn react link', () => {
  render(<AudioRecorder />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

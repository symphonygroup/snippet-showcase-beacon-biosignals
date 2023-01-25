import React from 'react';
import { render, screen } from '@testing-library/react';
import If from './If';

describe('If', () => {
  const CONTENT = <div data-testid="content">CONTENT</div>;

  test('Should return content if condition is true', () => {
    render(<If condition>{CONTENT}</If>);
    // eslint-disable-next-line testing-library/await-async-query
    expect(screen.findByTestId('content')).toBeTruthy();
  });

  test('Should not return content if condition is false', () => {
    render(<If condition={false}>{CONTENT}</If>);
    // eslint-disable-next-line testing-library/await-async-query
    expect(screen.findByTestId('content')).toMatchObject({});
  });
});

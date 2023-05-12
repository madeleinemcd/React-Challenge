import React from 'react';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Dashboard from './Dashboard';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.setTimeout(15000);

const server = setupServer(
  rest.get('https://datausa.io/api/data', (req, res, ctx) => {
    return res(ctx.status(500));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

let queryClient: QueryClient;

beforeEach(() => {
  queryClient = new QueryClient();
});


test('throws and handles error when API returns a non-200 status', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );

  await new Promise(resolve => setTimeout(resolve, 10000));

  expect(await screen.findByText('Error: Failed to fetch')).toBeInTheDocument();
});

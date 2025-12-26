import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App.tsx';
import { NearProvider } from './lib/NearProvider.tsx';
import { createTestnetClient } from 'near-api-ts';

const client = await createTestnetClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NearProvider client={client}>
      <App />
    </NearProvider>
  </StrictMode>,
);

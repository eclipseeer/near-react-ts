import { MantineProvider } from '@mantine/core';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { TestnetNearProvider } from '../lib/templates.tsx';
import '@mantine/core/styles.css';

createRoot(document.getElementById('root')!).render(
  <TestnetNearProvider>
    <MantineProvider>
      <App />
    </MantineProvider>
  </TestnetNearProvider>,
);

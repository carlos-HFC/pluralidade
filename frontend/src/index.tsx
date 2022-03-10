import ReactDOM from 'react-dom';
import { QueryClientProvider } from 'react-query';

import { App } from './App';
import { queryClient } from './services/queryClient';

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);
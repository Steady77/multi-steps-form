import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.scss';
import Router from './routes/routes';
import FormsStateProvider from './providers/forms-state-provider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<FormsStateProvider>
			<Router />
		</FormsStateProvider>
	</React.StrictMode>,
);

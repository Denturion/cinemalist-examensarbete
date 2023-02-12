import { AuthContextProvider } from '@/context/AuthContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../components/NavBar';

function App({ Component, pageProps }: AppProps) {
	return (
		<AuthContextProvider>
			<NavBar>
				<Component {...pageProps} />
			</NavBar>
		</AuthContextProvider>
	);
}

export default App;

import { useEffect, useState } from 'react';
import './App.css';
import { NavBar } from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { AppContext, appContextInitState, AppContextState, setUserContext } from './AppContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { APP_PALLETE } from './components/utils/colorConstants';
import { Modal } from './components/Modal';
import { clearJwt, getJwt } from './api/jwt/jwt';
import { loginWithJwt } from './api/fetchRoutines/authAPI';
import { LoadingSpinner } from './components/LoadingSpinner';
import { wait } from './api/fetchRoutines/fetchAPI';

const muiTheme = createTheme({
	typography: {
		fontFamily: ["system-ui", "Helvetica", "Arial", "sans-serif"].join(","),
		fontSize: 14,
	},
	palette: {
		primary: {
			main: APP_PALLETE['main-petrol'],
			dark: APP_PALLETE['dark-petrol'],
			light: APP_PALLETE['light-petrol'],
			contrastText: 'white'
		}
	}
})

export function App() {

	const [pendingLogin, setPendingLogin] = useState(true);
	const [appContext, setAppContext] = useState<AppContextState>(appContextInitState);
    console.log(`Context:`);
    console.log(appContext);

	useEffect(() => {
		setPendingLogin(true);
		debugger;
		if (!appContext.businessContext.userContext && getJwt()) {

			loginWithJwt()
			.then(response => {
				if (response.ok) {
					setAppContext({
						...appContext,
						businessContext: {
							...appContext.businessContext,
							userContext: response.content.user
						}
					})
				}
				else {
					console.error('JWT LOGIN failed. The existing token will be deleted.')
					clearJwt();
					setPendingLogin(false);
				}
			})
		}
		else {
			wait(750).then(() => setPendingLogin(false));
		}
	}, [appContext.businessContext.userContext?.username])

	return (
		<AppContext.Provider 
			value={{
				state: appContext,
				setState: setAppContext
			}}
		>
			<ThemeProvider theme={muiTheme}>
				<div className={`
					min-h-screen w-full
					flex ${pendingLogin ? 'justify-center' : 'justify-between'} items-center flex-col gap-4
				`}>
					{
						pendingLogin ?
						<>
							<span
								className="text-main-petrol font-bold text-7xl hover:text-main-petrol"
								style={{
									fontFamily: 'Pacifico'
								}}
							>
								WanderStay
							</span>
							<LoadingSpinner text=''/>
						</>
						:
						<>
							<NavBar/>
							<div
								className='
									rounded-md border-2 border-main-petrol 
									min-w-max flex justify-center items-start w-9/12 py-5 px-7
								'
								style={{
									minHeight: '40rem'
								}}
							>
								<Outlet/>
							</div>
							<Footer/>
						</>
					}
					<Modal/>
				</div>
			</ThemeProvider>
		</AppContext.Provider>
	);
}

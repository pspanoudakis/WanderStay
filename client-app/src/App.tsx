import { useState } from 'react';
import './App.css';
import { NavBar } from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { AppContext, appContextInitState, AppContextState } from './AppContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { APP_PALLETE } from './components/utils/colorConstants';
import { Modal } from './components/Modal';

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

	const [appContext, setAppContext] = useState<AppContextState>(appContextInitState);
    console.log(`Context:`);
    console.log(appContext);
	return (
		<AppContext.Provider 
			value={{
				state: appContext,
				setState: setAppContext
			}}
		>
			<ThemeProvider theme={muiTheme}>
				<div className="
					min-h-screen w-full
					flex justify-between items-center flex-col gap-4
				">
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
					<Modal/>
				</div>
			</ThemeProvider>
		</AppContext.Provider>
	);
}

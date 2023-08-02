import { useState } from 'react';
import './App.css';
import { NavBar } from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { AppContext, appContextInitState, AppContextState } from './AppContext';

export function App() {

	const [appContext, setAppContext] = useState<AppContextState>(appContextInitState)

	return (
		<AppContext.Provider 
			value={{
				state: appContext,
				setState: setAppContext
			}}
		>
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
			</div>		
		</AppContext.Provider>
	);
}

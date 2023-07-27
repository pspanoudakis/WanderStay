import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App/>}>
					<Route path='/signIn' element={<SignIn/>} />
					<Route path='/signUp' element={<SignUp/>} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
)

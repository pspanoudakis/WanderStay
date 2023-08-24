import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { MyProfile } from './pages/MyProfile';
import { UserInfo } from './pages/UserInfo';
import { SearchPropertiesPage } from './pages/SearchPropertiesPage';
import { PropertyPage } from './pages/PropertyPage';
import { TestPage } from './pages/Test';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path='signIn' element={<SignIn />} />
					<Route path='signUp' element={<SignUp />} />
					<Route path="profile">
						<Route index element={<MyProfile />} />
						<Route path='userInfo' element={<UserInfo />} />
					</Route>
					<Route path='searchProperties' element={<SearchPropertiesPage/>} />
					<Route path='property'>
						<Route path=':propertyId' element={<PropertyPage/>} />
					</Route>
					<Route path='test' element={<TestPage/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
)

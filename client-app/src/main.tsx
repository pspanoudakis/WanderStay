import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignInForm } from './pages/SignInForm';
import { SignUpForm } from './pages/SignUpForm';
import { MyProfile } from './pages/MyProfile';
import { UserProfilePage } from './pages/UserProfilePage';
import { SearchPropertiesPage } from './pages/SearchPropertiesPage';
import { PropertyPage } from './pages/PropertyPage';
import { TestPage } from './pages/Test';
import { ORDERED_BASE_ROLE_PATHS } from './pages/pathConstants';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path='signIn' element={<SignInForm />} />
					<Route path='signUp' element={<SignUpForm />} />
					{/* <Route path="profile" element={<MyProfile />}/> */}
					<Route path='searchProperties' element={<SearchPropertiesPage/>} />
					<Route path='property'>
						<Route path=':propertyId' element={<PropertyPage/>} />
					</Route>
					<Route path='test' element={<TestPage/>}/>
					{Object.values(ORDERED_BASE_ROLE_PATHS).map(
						basePath => <Route path={`${basePath + '/'}profile`} element={<UserProfilePage />} />
					)}
					<Route path={ORDERED_BASE_ROLE_PATHS.ADMIN}>
						<Route index element={<span>Admin Home</span>}/>
					</Route>
					<Route path={ORDERED_BASE_ROLE_PATHS.HOST}>
						<Route index element={<span>Host Home</span>}/>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
)

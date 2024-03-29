// import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignInForm } from './pages/SignInForm';
import { SignUpForm } from './pages/SignUpForm';
import { UserProfilePage } from './pages/UserProfilePage';
import { SearchPropertiesPage } from './pages/SearchPropertiesPage';
import { ORDERED_BASE_ROLE_PATHS } from './pages/pathConstants';
import { PropertyGuestViewPage } from './pages/PropertyGuestViewPage';
import { PropertyHostViewPage } from './pages/PropertyHostViewPage';
import { PropertyGuestSideChatPage } from './pages/PropertyGuestSideChatPage';
import { PropertyHostSideChatPage } from './pages/PropertyHostSideChatPage';
import { GuestReservationsPage } from './pages/GuestReservationsPage';
import { UserProfileAdminViewPage } from './pages/UserProfileAdminViewPage';
import { SearchUsersPage } from './pages/SearchUsersPage';
import { HostReservationsPage } from './pages/HostReservationsPage';
import { HostPropertiesPage } from './pages/HostPropertiesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { GuestHomePage } from './pages/GuestHomePage';
import { HostHomePage } from './pages/HostHomePage';
import { AdminHomePage } from './pages/AdminHomePage';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// <React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path='signIn' element={<SignInForm />} />
					<Route path='signUp' element={<SignUpForm />} />
					<Route path={ORDERED_BASE_ROLE_PATHS.GUEST}>
						<Route index element={<GuestHomePage/>} />
						<Route path='searchProperties' element={<SearchPropertiesPage/>} />
						<Route path='property'>
							<Route path=':propertyId'>
								<Route index element={<PropertyGuestViewPage/>} />
								<Route path='chat' element={<PropertyGuestSideChatPage/>} />
							</Route>
						</Route>
						<Route path='reservations' element={<GuestReservationsPage/>} />
					</Route>					
					<Route path={ORDERED_BASE_ROLE_PATHS.ADMIN}>
						<Route index element={<AdminHomePage/>} />
						<Route path='searchUsers' element={<SearchUsersPage/>} />
						<Route path='users/:username' element={<UserProfileAdminViewPage/>} />
					</Route>
					<Route path={ORDERED_BASE_ROLE_PATHS.HOST}>
						<Route index element={<HostHomePage/>} />
						<Route path='property'>
							<Route path=':propertyId'>
								<Route index element={<PropertyHostViewPage/>} />
								<Route path='chat/:conversationId' element={<PropertyHostSideChatPage/>} />
							</Route>
							<Route path='new' element={<PropertyHostViewPage/>} />
						</Route>
						<Route path='reservations' element={<HostReservationsPage/>} />
						<Route path='properties' element={<HostPropertiesPage/>} />
					</Route>
					{Object.values(ORDERED_BASE_ROLE_PATHS).map(
						(basePath, i) => <Route key={i} path={`${basePath + '/'}profile`} element={<UserProfilePage />} />
					)}
					<Route path='*' element={<NotFoundPage/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	// </React.StrictMode>,
);

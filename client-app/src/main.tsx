import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignInForm } from './pages/SignInForm';
import { SignUpForm } from './pages/SignUpForm';
import { UserProfilePage } from './pages/UserProfilePage';
import { SearchPropertiesPage } from './pages/SearchPropertiesPage';
import { TestPage } from './pages/Test';
import { ORDERED_BASE_ROLE_PATHS } from './pages/pathConstants';
import { PropertyGuestViewPage } from './pages/PropertyGuestViewPage';
import { PropertyHostViewPage } from './pages/PropertyHostViewPage';
import { PropertyGuestSideChatPage } from './pages/PropertyGuestSideChatPage';
import { PropertyConversationsPage } from './pages/PropertyConversationsPage';
import { PropertyHostSideChatPage } from './pages/PropertyHostSideChatPage';
import { GuestReservationsPage } from './pages/GuestReservationsPage';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path='signIn' element={<SignInForm />} />
					<Route path='signUp' element={<SignUpForm />} />
					<Route path='searchProperties' element={<SearchPropertiesPage/>} />
					<Route path='property'>
						<Route path=':propertyId'>
							<Route index element={<PropertyGuestViewPage/>}/>
							<Route path='chat' element={<PropertyGuestSideChatPage/>}/>
						</Route>
					</Route>
					<Route path='myReservations' element={<GuestReservationsPage/>}/>
					<Route path='test' element={<TestPage/>}/>
					{Object.values(ORDERED_BASE_ROLE_PATHS).map(
						(basePath, i) => <Route key={i} path={`${basePath + '/'}profile`} element={<UserProfilePage />} />
					)}
					<Route path={ORDERED_BASE_ROLE_PATHS.ADMIN}>
						<Route index element={<span>Admin Home</span>}/>
					</Route>
					<Route path={ORDERED_BASE_ROLE_PATHS.HOST}>
						<Route index element={<span>Host Home</span>}/>
						<Route path='property'>
							<Route path=':propertyId'>
								<Route index element={<PropertyHostViewPage/>}/>
								<Route path='allChat' element={<PropertyConversationsPage/>}/>
								<Route path='chat/:conversationId' element={<PropertyHostSideChatPage/>}/>
							</Route>
							<Route path='new' element={<PropertyGuestSideChatPage/>} />
						</Route>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
);

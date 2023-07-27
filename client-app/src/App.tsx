import { useState } from 'react';
import './App.css';
import { NavBar } from './components/NavBar';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';

export function App() {
	return (
		<div className="h-full flex justify-start items-center flex-col gap-4 w-full">
			<NavBar/>
			<SignUp/>
		</div>
	);
}

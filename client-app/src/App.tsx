import { useState } from 'react';
import './App.css';
import { NavBar } from './components/NavBar';

export function App() {
	return (
		<div className="h-full flex justify-start items-center flex-col gap-4 w-full">
			<NavBar/>
		</div>
	);
}

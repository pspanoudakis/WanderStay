import { useState } from 'react'
import './App.css'

const sampleResponseText = JSON.stringify({a: 1, b: {c:3}}, null, "\t");
const jwt = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4MDEyNzUxOSwiZXhwIjoxNjgwMTI3NTc5fQ.rnXUhkvevMYlSV_uLCF5S1jIzmw0W3Sq2udo8dtt7hw';

export function App() {
	const DOMAIN_URL = 'http://localhost:8080/';
	const [url, setUrl] = useState(DOMAIN_URL);
	const [response, setResponse] = useState<string | null>(null);

	const sendRequest = () => {
		fetch(
			url,
			{
				// method: 'GET',
				method: 'POST',
				body: JSON.stringify({
					"username": "admin",
					"password": "admin"
				}),
				headers: {
                    'Content-Type': 'application/json',
					// 'Authorization': `Bearer ${jwt}`
                },
			}
		).then(r => {
			r.json().then(obj => setResponse(JSON.stringify(obj, null, '\t')));
			// r.text().then(txt => setResponse(txt));
		}).catch(err => {
			console.error(err);
			setResponse(null);
		});
	}

	const updateUrl = (urlTail: string) => setUrl(`${DOMAIN_URL}${urlTail}`);

	return (
		<div className="h-full flex justify-start items-center flex-col gap-4">
			<p className='text-3xl'>Test CORS</p>
			<div className='flex gap-1 justify-center items-center text-xl'>
				<code>{DOMAIN_URL}</code>
				<input
					type="text"
					className='outline-none rounded-md px-2 py-1 font-mono'
					onChange={e => updateUrl(e.target.value)}
					spellCheck='false'
				/>
				<button className='py-1 px-2' onClick={sendRequest}>Send Request</button>
			</div>
			{
				response ?
				<pre className='bg-black text-left rounded-md px-3 py-2 w-full whitespace-pre-wrap'>
					{response}
				</pre>
				:
				null
			}
		</div>
	);
}

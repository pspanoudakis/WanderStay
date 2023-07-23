import { useState } from 'react';
import './App.css';

// const sampleRequestText = JSON.stringify({"username":"pavlos", "password":"pavlos"}, null, "\t");

export function App() {
	const DOMAIN_URL = 'https://localhost:8080/';
	enum HTTP_METHOD {
		GET = "GET",
		POST = "POST"
	};

	const [method, setMethod] = useState(HTTP_METHOD.GET);
	const [body, setBody] = useState('');
	const [url, setUrl] = useState(DOMAIN_URL);
	const [response, setResponse] = useState<string | null>(null);
	const [jwt, setJwt] = useState('');

	const sendRequest = () => {
		fetch(
			url,
			{
				method: method,
				body: (
					method === HTTP_METHOD.GET 
					?
					undefined
					:
					body
				), 
				headers: {
                    'Content-Type': 'application/json',
					'Authorization': jwt ? `Bearer ${jwt}` : ''
                },
			}
		)
		.then(r => {
			if (r.headers.get("content-type") === "application/json") {
				r.json().then(
					obj => setResponse(JSON.stringify(obj, null, '\t'))
				);
			}
			else {
				r.text().then(txt => setResponse(txt));
			}
		})
		.catch(err => {
			console.error(err);
			setResponse(null);
		});
	};

	const updateUrl = (urlTail: string) => setUrl(`${DOMAIN_URL}${urlTail}`);

	const updateMethod = (m: HTTP_METHOD) => setMethod(m)

	return (
		<div className="h-full flex justify-start items-center flex-col gap-4">
			<p className='text-3xl'>Test CORS</p>
			<div className='flex gap-1 justify-center items-center text-xl'>
				<select className='outline-none rounded-md px-2 py-1 font-mono' onChange={e => updateMethod(e.target.value as HTTP_METHOD)}>
				{
					Object.values(HTTP_METHOD).map(
						(m, i) => <option key={i} value={m}>{m}</option>
					)
				}
				</select>
				<code>{DOMAIN_URL}</code>
				<input
					type="text"
					className='outline-none rounded-md px-2 py-1 font-mono'
					onChange={e => updateUrl(e.target.value)}
					spellCheck='false'
				/>
				<button className='py-1 px-2' onClick={sendRequest}>Send Request</button>
			</div>
			<div className='w-full flex gap-2 items-center'>
				<p className='text-xl'>Bearer: </p>
				<input
					type="text"
					className='bg-black flex-grow outline-none rounded-md px-2 py-1 font-mono'
					onChange={e => setJwt(e.target.value)}
					spellCheck='false'
					value={jwt}
				/>
				<button className='py-1 px-2' onClick={ () => setJwt('')} disabled={jwt === ''}>Clear</button>
			</div>
			{
				method === HTTP_METHOD.POST ?
				<div className='w-full flex flex-col gap-2 items-start'>
					<p className='text-xl'>Request Body:</p>
					<textarea
						className='px-2 py-1 font-mono bg-black w-full min-h-fit resize-none rounded-md outline-none'
						spellCheck='false'
						value={body}
						onChange={e => setBody(e.target.value)}
					/>
				</div>
				:
				null
			}
			{
				response ?
				<div className='w-full flex flex-col gap-2 items-start'>
					<p className='text-xl'>Response:</p>
					<pre className='bg-black text-left rounded-md px-3 py-2 w-full whitespace-pre-wrap'>
						{response}
					</pre>
				</div>
				:
				null
			}
		</div>
	);
}

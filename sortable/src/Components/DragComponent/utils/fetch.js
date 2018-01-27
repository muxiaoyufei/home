
let fetchData = (url, opts, binding, callback) => {
	fetch(url, {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'binding': binding,
		},
		method: 'post',
		body: JSON.stringify(opts)
	})
		.then(response => response.json())
		.then(res => {
			callback(res);
		})
}

export default fetchData;

export function Request(url, data) {
	return fetch(url, {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	})
		.then((res) => {
			if(res.status == 200){
				return res.json().then((json) => {
					return json;
				})
			}else{
				return {
					flag : "ERROR"
				};
			}
		})
		.catch((e) => {
			console.log("ERROR")
			return {
				flag : "ERROR"
			};
		})
}
import fetch       from 'isomorphic-fetch';
import queryString from 'query-string';

export default {
	get(requestUrl, body = {}, params = {}) {
		return this.request({
			url: requestUrl,
			method: 'get',
			body: body,
			params
		});
	},

	post(requestUrl, body = {}) {
		return this.request({
			url: requestUrl,
			method: 'post',
			body: body
		});
	},

	request({ url, method, body, params = {} }) {
		const urlWithQuery = `${url}?${queryString.stringify(params)}`;

		const init = {
			method,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		};

		if (method !== 'get' && method !== 'head') {
			init.body = JSON.stringify(body);
		}

		return fetch(`/${urlWithQuery}`, init).then(res => {
			if (res.status >= 400) {
				throw new Error('Bad response from server');
			}

			return res.json();
		});
	}
}

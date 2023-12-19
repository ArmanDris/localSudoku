class DeliveryBoy {
	url = 'https://blueberrypie.myddns.me:443'

	async deliver(name, score) {

		this.handleLocalServer();

		fetch(this.url + '/mailbox', {
			method: 'POST',
			mode: 'cors',
			cache: 'no-store',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({ name: name, score: score })
		})
			.then(response => {
				if (response.ok) {
					console.log('Score sent successfully');
					return true;
				}
				else {
					console.error('Failed to send score, Error:', response.status);
				}
			})
			.catch(error => {
				console.error('Error', error)
			})
	}

	async receive() {
		this.handleLocalServer();
		try {
			const response = await fetch(this.url + '/leaderboard', {
				method: 'POST',
				mode: 'cors',
				cache: 'no-store',
				headers: {
					'Content-type': 'application/json'
				}
			});

			if (response.ok) {
				const data = await response.json();
				return data.leaderboard;
			}
			else {
				throw new Error(response.status);
			}
		}
		catch (error) {
			console.log(error);
			throw error;
		}
	}

	async handleLocalServer() {
		let local_url = 'http://192.168.1.75:443';
		try {
			const response = await fetch(local_url + '/leaderboard');
			if (response.ok)
				this.url = local_url;
		} catch (error) {
			return;
		}
	}
}
class DeliveryBoy {
	server = 'http://strawberrypie.drismir.ca';

	async deliver(name, time, difficulty) {

		fetch(this.url + '/mailbox', {
			method: 'POST',
			mode: 'cors',
			cache: 'no-store',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({ name: name, time: time, difficulty: difficulty })
		})
			.then(response => {
				if (response.ok) {
					console.log('Time sent successfully');
					return true;
				}
				else {
					console.error('Failed to send time, Error:', response.status);
				}
			})
			.catch(error => {
				console.error('Error', error)
			})
	}

	async receive() {

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
}
class DeliveryBoy {
	public_url = 'https://23.16.237.88';
	local_url = 'https://cors-anywhere.herokuapp.com/https://23.16.237.88';
	// Get access to demo server at: https://cors-anywhere.herokuapp.com/corsdemo

	url;

	async setURL() 
	{
		try {
			const response = await fetch(this.public_url + '/ping');
			if (response.ok)
				this.url = this.public_url;
		} catch (error) {
			this.url = this.local_url;
		}
	}

	async deliver(name, time, difficulty) {

		if (!this.url)
			await this.setURL();

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

		if (!this.url) 
			await this.setURL();

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
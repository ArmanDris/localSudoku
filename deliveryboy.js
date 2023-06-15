class deliveryBoy {

    deliverAndReceive(name, score) {
        let url = 'http://127.0.0.1:5000/leaderboard';
        const data = { name: name, score: score };
        let scores = [];

        const fetchPromise = fetch(url, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            return data.leaderboard;
        })
        .catch(error => {
            console.error(error);
        });

        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('Request timed out'));
            }, 1000); // Adjust the timeout duration (in milliseconds) as needed
        });
    
        return Promise.race([fetchPromise, timeoutPromise]);
    }
}
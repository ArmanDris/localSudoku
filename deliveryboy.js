class deliveryBoy {
    constructor() {
        this.scores;
    }

    deliverAndReceive(name, score) {
        let url = 'http://127.0.0.1:5000/scores';
        const data = { name: name, score: score };

        fetch(url, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            const leaderboard = data.data.leaderboard;
            console.log(leaderboard);
        })
        .catch(error => {
            console.error('NMI_HARDWARE_FAILURE (Error Code 0x00000080)', error);
        });

        return this.scores;
    }
}
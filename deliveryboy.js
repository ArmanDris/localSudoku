class DeliveryBoy {

    deliver(name, score) {
        fetch('http://127.0.0.1:5000/mailbox', {
            method: 'POST',
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
        try {
            const response = await fetch('http://127.0.0.1:5000/leaderboard', {
              method: 'POST',
              headers: {
                'Content-type': 'application/json'
              }
            });
        
            if (response.ok) {
              const data = await response.json();
              console.log(data.leaderboard);
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
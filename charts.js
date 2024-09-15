function loadChart() {
    const ctx = document.getElementById('myChart');

    const data = {
        labels: [
            'HP',
            'Attack',
            'Defense',
            'Special-Attack',
            'Special-Defense',
            'Speed'
        ],
        datasets: [{
            label: 'Base Stats',
            data: currentPokemonStats,
            backgroundColor: cardBackground,
            borderColor: cardColor,
            borderWidth: 1
        }]
    };

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            },
        }
    });
}

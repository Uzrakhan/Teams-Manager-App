const url = '/api/teams'; // Use your backend API endpoint
const apiKey = '3e94728e52274d23bfdd7eff3367d170';

async function fetchTeams() {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Auth-Token': apiKey, // Optional; backend already handles it
            },
        });

        const data = await response.json();
        const teams = data.teams; // This should now reflect real data from Football Data API
        displayTeams(teams);
        console.log(data);
        console.log(teams);
    } catch (error) {
        console.error('error:', error);
    }
}

function displayTeams(teams) {
    const teamsList = document.getElementById('teams-list');
    teamsList.innerHTML = '';

    teams.forEach((team) => {
        const teamEl = document.createElement('div');
        const competitions = team.runningCompetitions || []; // Ensure it's safe to iterate
        teamEl.innerHTML = `
         <div class="player-card">
            <h3>Team: ${team.name}</h3>
            <p>Established: ${team.founded}</p>
            <p>Home Ground: ${team.address}</p>
            <img src="${team.crest}" style="width: 80px; height: auto;">
            <p>Official Website: 
                <a href="${team.website}" target="_blank" rel="noopener noreferrer">
                    ${team.website}
                </a>
            </p>
            <p>Coach/Manager: ${team.coach?.name || 'N/A'}</p>
            <p>Leagues Played:
                <ul>
                    ${
                        competitions.length > 0
                            ? competitions
                                  .map((comp) => `<li>${comp.name}</li>`)
                                  .join('')
                            : '<li>No competitions available.</li>'
                    }
                </ul>
            </p>
         </div>
        `;
        teamsList.appendChild(teamEl);
    });
}

document
    .getElementById('fetch-data')
    .addEventListener('click', fetchTeams);

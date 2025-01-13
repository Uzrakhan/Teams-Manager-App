//const url = '/api/teams'; // Use your backend API endpoint
const apiKey = '3e94728e52274d23bfdd7eff3367d170';
const url = 'http://localhost:3001/https://api.football-data.org/v4/teams';

let teams = [];
async function fetchTeams(event) {
    event.preventDefault();

    // Build the API URL based on the filter
    //let filterUrl = `${url}?`;

    // If teamName is specified, add it as a query parameter
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Auth-Token': apiKey, // Optional; backend already handles it
            },
        });

        const data = await response.json();
        teams = data.teams; // This should now reflect real data from Football Data API

        displayTeams(teams);
        console.log(teams);

        const filterInput = document.getElementById('filter-name');
        const filterBtn = document.getElementById('filter-btn');

        filterBtn.addEventListener('click', () => {
            const filterValue = filterInput.value.toLowerCase();

            //filter teams by name
            const filteredTeams = teams.filter((team) => {
                if(team && team.name) {
                    return team.name.toLowerCase().includes(filterValue);
                } else {
                    false
                }
            });
        displayTeams(filteredTeams);

          if(filteredTeams.length === 0) {
            console.log('No teams found for given criteria.');
           }

        });

    } catch (error) {
        console.error('error:', error);
    }
}

function displayTeams(teams) {
    const teamsList = document.getElementById('teams-list');
    teamsList.innerHTML = '';

    //newly addeds
    if(teams.length === 0) {
        teamsList.innerHTML = '<p>o teams found based on the filter criteria.</p>';
        return;
    }



    teams.forEach((team) => {
        const teamEl = document.createElement('div');
        const competitions = team.runningCompetitions || []; // Ensure it's safe to iterate
        teamEl.innerHTML = `
         <div class="player-card">
            <h3>Team: ${team.name}</h3>
            <p>Founded: ${team.founded}</p>
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

function sortTeams(criteria) {
    let sortedTeams = [...teams];

    sortedTeams.sort((a,b) => {
        if(criteria === 'name') {
            return a.name.localeCompare(b.name);
        } else if (criteria === 'founded') {
            return (a.founded || 0) - (b.founded || 0);
        } else {
            return 0;
        }
    });
    displayTeams(sortedTeams);
}

/*document
    .getElementById('fetch-data')
    .addEventListener('click', fetchTeams);
*/

//load data as soon as page loads
document.addEventListener('DOMContentLoaded', fetchTeams);
document.getElementById('sort-select').addEventListener('change', (event) => {
    const criteria = event.target.value;
    sortTeams(criteria);
});






const apiKey = '3e94728e52274d23bfdd7eff3367d170';
//const url = 'http://localhost:3000/api/competitions/2021/teams';
const url = '/api/teams';
//const proxyUrl = 'http://localhost:3000/';

async function fetchTeams() {
    try{
        console.log('Fetching from URL:', url); // Debug log
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Auth-Token': apiKey
            }
        });
        const data = await response.json();
        const teams = data.teams;
        displayTeams(teams)
        console.log(data);
        console.log(teams);
    }catch(error) {
        console.error('error:',error)
    }
}

function displayTeams(teams) {
    const teamsList = document.getElementById('teams-list');
    teamsList.innerHTML = '';

    teams.forEach(team => {
        const teamEl = document.createElement('div');
        const competitions = team.runningCompetitions;
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
            <p>Coach/Manager: ${team.coach.name}</p>
            <p>Leagues Played:
                <ul>
                    ${competitions && competitions.length > 0 ?
                        competitions.map(comp => `<li>${comp.name}</li>`).join('') :
                        '<li>No comp available.</li>'
                    }
                </ul>
            </p>
         </div>
        `;
        teamsList.appendChild(teamEl);
    });
}

document.getElementById('fetch-data').addEventListener('click', fetchTeams);
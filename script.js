const apiUrl = 'https://api.football-data.org/v4/competitions/2021/teams';
const API_KEY = '3e94728e52274d23bfdd7eff3367d170';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Use the proxy


async function fetchData() {
    try{
        const response = await fetch(`${proxyUrl}${apiUrl}`, {
            method: 'GET',
            headers: {
                'X-Auth-Token' : API_KEY,
            }
        });
        const data = await response.json();
        const teams = data.teams; //extract teams data
        displayTeams(teams)
        console.log(data);
        console.log(teams);
    } catch(error) {
        console.error('err:',error)
    }
}

function displayTeams(teams) {
    const teamsList = document.getElementById('teams-list');
    teamsList.innerHTML = '';

    teams.forEach(team => {
        const teamElement = document.createElement('div');
        const competitions = team.runningCompetitions;
        const squads = team.squad;
        teamElement.innerHTML = `
            <h3>${team.name}</h3>
            <img src="${team.area.flag}" style="width: 100px; height: 50vh;">
            <p>${team.website}</p>
            <p>${team.coach.name}</p>
            <p>Competitions:
                <ul>
                    ${competitions && competitions.length > 0 ?
                        competitions.map(comp => `<li>${comp.name}</li>`).join('') :
                        '<li>No competitions available</li>'
                    }
                </ul>
            </p>
            <p>Squad: 
                <ul>
                    ${squads && squads.length > 0 ?
                        squads.map(sqd => `Name:<li>${sqd.name}</li>
                            Position:<li>${sqd.position}</li>`).join('') :
                            '<li>No Squad available.</li>'
                    }
                </ul>
            </p>
        ` ;
        teamsList.appendChild(teamElement)
    })

}
document.getElementById('fetch-data').addEventListener('click', fetchData);
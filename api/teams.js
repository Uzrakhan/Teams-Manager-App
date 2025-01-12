export default async function handler(req, res) {
  const apiKey = '3e94728e52274d23bfdd7eff3367d170';
  const url = 'https://api.football-data.org/v4/competitions/2021/teams';

  try {
      console.log('Fetching data from Football Data API...');

      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'X-Auth-Token': apiKey,
          },
      });

      console.log(`Response status from Football Data API: ${response.status}`);

      if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched data from Football Data API:', data);

      if (!data || !data.teams) {
          throw new Error('Data structure is invalid or "teams" is missing.');
      }

      res.status(200).json(data);
  } catch (error) {
      console.error('Error in /api/teams handler:', error.message);
      res.status(500).json({ error: error.message });
  }
}

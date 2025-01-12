export default async function handler(req, res) {
  const apiKey = '3e94728e52274d23bfdd7eff3367d170';
  const url = 'https://api.football-data.org/v4/competitions/2021/teams'; // Replace with the correct endpoint

  try {
    console.log('Fetching data from Football Data API...'); // Debug log
      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'X-Auth-Token': apiKey,
          },
      });
      console.log(`Response status: ${response.status}`); // Log status


      if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Data fetched:', data); // Log the fetched data
      res.status(200).json(data); // Pass the API data back to the frontend
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data from the API' });
  }
}

export default function handler(req, res) {
  const teams = [
      {
          name: "Team A",
          founded: 1901,
          address: "Stadium A",
          crest: "url",
          website: "url",
          coach: { name: "Coach A" },
          runningCompetitions: [],
      },
      // Add more teams as needed
  ];
  res.status(200).json({ teams });
}

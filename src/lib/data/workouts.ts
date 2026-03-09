export interface WorkoutDivision {
  name: "Rx" | "Scaled" | "Foundations";
  description: string;
  equipment: { women: string; men: string };
}

export interface Workout {
  id: string;
  name: string;
  type: "AMRAP" | "For Time" | "Max Weight";
  timeCapMinutes: number;
  movements: string[];
  divisions: WorkoutDivision[];
  image?: string;
  completionRateRx: number;
  completionRateScaled: number;
  avgScoreRx: string;
  avgScoreScaled: string;
  topScoreRx: string;
  topScoreScaled: string;
  scoreDistribution: { label: string; count: number }[];
}

const WORKOUT_26_1_DESCRIPTION = `For time:
20 wall-ball shots
18 box jump-overs
30 wall-ball shots
18 box jump-overs
40 wall-ball shots
18 medicine-ball box step-overs
66 wall-ball shots
18 medicine-ball box step-overs
40 wall-ball shots
18 box jump-overs
30 wall-ball shots
18 box jump-overs
20 wall-ball shots

Time cap: 12 minutes`;

export const WORKOUTS: Workout[] = [
  {
    id: "26.1",
    name: "26.1",
    type: "For Time",
    timeCapMinutes: 12,
    movements: ["Wall-Ball Shots", "Box Jump-Overs", "Medicine-Ball Box Step-Overs"],
    image: "/workouts/26-1.jpg",
    divisions: [
      {
        name: "Rx",
        description: WORKOUT_26_1_DESCRIPTION,
        equipment: {
          women: "14-lb (6-kg) medicine ball, 9-foot target, 20-inch box",
          men: "20-lb (9-kg) medicine ball, 10-ft target, 24-inch box",
        },
      },
      {
        name: "Scaled",
        description: WORKOUT_26_1_DESCRIPTION.replace("box jump-overs", "box jump-overs"),
        equipment: {
          women: "10-lb (4-kg) medicine ball, 9-foot target, 20-inch box (may step up)",
          men: "14-lb (6-kg) medicine ball, 10-foot target, 24-inch box (may step up)",
        },
      },
      {
        name: "Foundations",
        description: WORKOUT_26_1_DESCRIPTION.replace(/box jump-overs/g, "box step-overs"),
        equipment: {
          women: "10-lb (4-kg) medicine ball to a 9-foot target, 20-inch box",
          men: "14-lb (6-kg) medicine ball to a 10-foot target, 20-inch box",
        },
      },
    ],
    completionRateRx: 65,
    completionRateScaled: 35,
    avgScoreRx: "—",
    avgScoreScaled: "—",
    topScoreRx: "—",
    topScoreScaled: "—",
    scoreDistribution: [
      { label: "< 3:00", count: 0 },
      { label: "3:00–5:59", count: 0 },
      { label: "6:00–8:59", count: 0 },
      { label: "9:00–11:59", count: 0 },
      { label: "Time Cap", count: 0 },
    ],
  },
];

export const SUMMARY_STATS = {
  totalAthletes: 604,
  totalAffiliates: 24,
  totalProvinces: 18,
  year: 2026,
  edition: "CrossFit Open 25",
  divisions: [
    { name: "Men Rx", count: 112 },
    { name: "Women Rx", count: 98 },
    { name: "Men Scaled", count: 68 },
    { name: "Women Scaled", count: 54 },
    { name: "Men Masters 35-39", count: 28 },
    { name: "Women Masters 35-39", count: 22 },
    { name: "Men Masters 40-44", count: 8 },
    { name: "Women Masters 40-44", count: 6 },
  ],
  participationByYear: [
    { year: 2017, men: 101, women: 69,  total: 170 },
    { year: 2018, men: 153, women: 116, total: 269 },
    { year: 2019, men: 114, women: 77,  total: 191 },
    { year: 2020, men: 77,  women: 69,  total: 146 },
    { year: 2021, men: 79,  women: 76,  total: 155 },
    { year: 2022, men: 82,  women: 93,  total: 175 },
    { year: 2023, men: 98,  women: 100, total: 198 },
    { year: 2024, men: 116, women: 116, total: 232 },
    { year: 2025, men: 201, women: 159, total: 360 },
    { year: 2026, men: 308, women: 296, total: 604 },
  ],
};

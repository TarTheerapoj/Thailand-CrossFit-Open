export interface Workout {
  id: string;
  name: string;
  description: string;
  timeCapMinutes: number;
  movements: string[];
  type: "AMRAP" | "For Time" | "Max Weight";
  completionRateRx: number;
  completionRateScaled: number;
  avgScoreRx: string;
  avgScoreScaled: string;
  topScoreRx: string;
  topScoreScaled: string;
  scoreDistribution: { label: string; count: number }[];
}

export const WORKOUTS: Workout[] = [
  {
    id: "25.1",
    name: "25.1",
    description:
      "Complete as many reps as possible in 15 minutes of:\n3 wall walks\n12 dumbbell snatches (50/35 lb)\n15 box jumps (24/20 in)",
    timeCapMinutes: 15,
    movements: ["Wall Walks", "Dumbbell Snatches", "Box Jumps"],
    type: "AMRAP",
    completionRateRx: 72,
    completionRateScaled: 28,
    avgScoreRx: "218 reps",
    avgScoreScaled: "165 reps",
    topScoreRx: "245 reps",
    topScoreScaled: "210 reps",
    scoreDistribution: [
      { label: "< 150", count: 45 },
      { label: "150–179", count: 88 },
      { label: "180–209", count: 124 },
      { label: "210–229", count: 97 },
      { label: "230+", count: 42 },
    ],
  },
  {
    id: "25.2",
    name: "25.2",
    description:
      "For time (20-min cap):\nClean & jerk (135/95 lb)\n50 double-unders\nClean & jerk (185/125 lb)\n50 double-unders\nClean & jerk (225/155 lb)\n50 double-unders\nMax clean & jerk (275/185 lb)",
    timeCapMinutes: 20,
    movements: ["Clean & Jerk", "Double-Unders"],
    type: "For Time",
    completionRateRx: 58,
    completionRateScaled: 42,
    avgScoreRx: "155 lb / 8:24",
    avgScoreScaled: "115 lb / 9:12",
    topScoreRx: "180 lb / 4:32",
    topScoreScaled: "145 lb / 5:18",
    scoreDistribution: [
      { label: "Ladder 1", count: 62 },
      { label: "Ladder 2", count: 98 },
      { label: "Ladder 3", count: 134 },
      { label: "Ladder 4", count: 56 },
      { label: "Finished", count: 46 },
    ],
  },
  {
    id: "25.3",
    name: "25.3",
    description:
      "Complete as many reps as possible in 15 minutes of:\n10 thrusters (95/65 lb)\n10 chest-to-bar pull-ups\n10 thrusters\n10 bar muscle-ups",
    timeCapMinutes: 15,
    movements: ["Thrusters", "Chest-to-Bar Pull-Ups", "Bar Muscle-Ups"],
    type: "AMRAP",
    completionRateRx: 65,
    completionRateScaled: 35,
    avgScoreRx: "290 reps",
    avgScoreScaled: "245 reps",
    topScoreRx: "322 reps",
    topScoreScaled: "288 reps",
    scoreDistribution: [
      { label: "< 220", count: 38 },
      { label: "220–259", count: 76 },
      { label: "260–289", count: 142 },
      { label: "290–309", count: 89 },
      { label: "310+", count: 51 },
    ],
  },
];

export const SUMMARY_STATS = {
  totalAthletes: 396,
  totalAffiliates: 22,
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
    { year: 2020, athletes: 180 },
    { year: 2021, athletes: 210 },
    { year: 2022, athletes: 248 },
    { year: 2023, athletes: 302 },
    { year: 2024, athletes: 358 },
    { year: 2025, athletes: 382 },
    { year: 2026, athletes: 396 },
  ],
};

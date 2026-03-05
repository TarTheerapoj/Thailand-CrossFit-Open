export type Division = "Men Rx" | "Women Rx" | "Men Scaled" | "Women Scaled" | "Men Masters 35-39" | "Women Masters 35-39" | "Men Masters 40-44" | "Women Masters 40-44";

export interface WorkoutScore {
  workoutId: string;
  score: string;
  rank: number;
  tiebreak?: number;
}

export interface Athlete {
  id: string;
  name: string;
  affiliate: string;
  division: Division;
  overallRank: number;
  overallScore: number;
  age: number;
  province: string;
  workoutScores: WorkoutScore[];
}

export const ATHLETES: Athlete[] = [
  {
    id: "a001",
    name: "ธนวัฒน์ ศรีสมบัติ",
    affiliate: "CrossFit Bangkok",
    division: "Men Rx",
    overallRank: 1,
    overallScore: 4,
    age: 28,
    province: "กรุงเทพฯ",
    workoutScores: [
      { workoutId: "25.1", score: "245 reps", rank: 1 },
      { workoutId: "25.2", score: "180 lb / 4:32", rank: 1 },
      { workoutId: "25.3", score: "320 reps", rank: 2 },
    ],
  },
  {
    id: "a002",
    name: "กฤษณ์ วงศ์สมุทร",
    affiliate: "CrossFit Chiang Mai",
    division: "Men Rx",
    overallRank: 2,
    overallScore: 7,
    age: 31,
    province: "เชียงใหม่",
    workoutScores: [
      { workoutId: "25.1", score: "238 reps", rank: 3 },
      { workoutId: "25.2", score: "180 lb / 4:45", rank: 2 },
      { workoutId: "25.3", score: "318 reps", rank: 2 },
    ],
  },
  {
    id: "a003",
    name: "ปิยะ มหาชัย",
    affiliate: "CrossFit Phuket",
    division: "Men Rx",
    overallRank: 3,
    overallScore: 10,
    age: 26,
    province: "ภูเก็ต",
    workoutScores: [
      { workoutId: "25.1", score: "240 reps", rank: 2 },
      { workoutId: "25.2", score: "155 lb / 5:12", rank: 5 },
      { workoutId: "25.3", score: "322 reps", rank: 3 },
    ],
  },
  {
    id: "a004",
    name: "สุรชัย ทองดี",
    affiliate: "CrossFit Bangkok",
    division: "Men Rx",
    overallRank: 4,
    overallScore: 15,
    age: 33,
    province: "กรุงเทพฯ",
    workoutScores: [
      { workoutId: "25.1", score: "225 reps", rank: 6 },
      { workoutId: "25.2", score: "180 lb / 5:01", rank: 4 },
      { workoutId: "25.3", score: "315 reps", rank: 5 },
    ],
  },
  {
    id: "a005",
    name: "อภิชัย รุ่งเรือง",
    affiliate: "CrossFit Korat",
    division: "Men Rx",
    overallRank: 5,
    overallScore: 18,
    age: 29,
    province: "นครราชสีมา",
    workoutScores: [
      { workoutId: "25.1", score: "228 reps", rank: 5 },
      { workoutId: "25.2", score: "155 lb / 4:58", rank: 3 },
      { workoutId: "25.3", score: "308 reps", rank: 10 },
    ],
  },
  {
    id: "a006",
    name: "นภาพร สุขใจ",
    affiliate: "CrossFit Bangkok",
    division: "Women Rx",
    overallRank: 1,
    overallScore: 3,
    age: 27,
    province: "กรุงเทพฯ",
    workoutScores: [
      { workoutId: "25.1", score: "198 reps", rank: 1 },
      { workoutId: "25.2", score: "125 lb / 5:21", rank: 1 },
      { workoutId: "25.3", score: "265 reps", rank: 1 },
    ],
  },
  {
    id: "a007",
    name: "วรรณิษา พลอยงาม",
    affiliate: "CrossFit Chiang Mai",
    division: "Women Rx",
    overallRank: 2,
    overallScore: 8,
    age: 24,
    province: "เชียงใหม่",
    workoutScores: [
      { workoutId: "25.1", score: "192 reps", rank: 3 },
      { workoutId: "25.2", score: "125 lb / 5:45", rank: 3 },
      { workoutId: "25.3", score: "258 reps", rank: 2 },
    ],
  },
  {
    id: "a008",
    name: "กมลวรรณ ใจดี",
    affiliate: "CrossFit Pattaya",
    division: "Women Rx",
    overallRank: 3,
    overallScore: 9,
    age: 30,
    province: "ชลบุรี",
    workoutScores: [
      { workoutId: "25.1", score: "195 reps", rank: 2 },
      { workoutId: "25.2", score: "105 lb / 5:33", rank: 4 },
      { workoutId: "25.3", score: "252 reps", rank: 3 },
    ],
  },
  {
    id: "a009",
    name: "ชนาภา วิไลรัตน์",
    affiliate: "CrossFit Phuket",
    division: "Women Rx",
    overallRank: 4,
    overallScore: 14,
    age: 32,
    province: "ภูเก็ต",
    workoutScores: [
      { workoutId: "25.1", score: "185 reps", rank: 6 },
      { workoutId: "25.2", score: "125 lb / 5:28", rank: 2 },
      { workoutId: "25.3", score: "244 reps", rank: 6 },
    ],
  },
  {
    id: "a010",
    name: "ปณิตา เจริญสุข",
    affiliate: "CrossFit Korat",
    division: "Women Rx",
    overallRank: 5,
    overallScore: 17,
    age: 25,
    province: "นครราชสีมา",
    workoutScores: [
      { workoutId: "25.1", score: "188 reps", rank: 4 },
      { workoutId: "25.2", score: "105 lb / 6:02", rank: 7 },
      { workoutId: "25.3", score: "248 reps", rank: 6 },
    ],
  },
];

export const AFFILIATES = [
  { name: "CrossFit Bangkok", athletes: 42, province: "กรุงเทพฯ" },
  { name: "CrossFit Chiang Mai", athletes: 18, province: "เชียงใหม่" },
  { name: "CrossFit Phuket", athletes: 15, province: "ภูเก็ต" },
  { name: "CrossFit Pattaya", athletes: 12, province: "ชลบุรี" },
  { name: "CrossFit Korat", athletes: 10, province: "นครราชสีมา" },
  { name: "CrossFit Khon Kaen", athletes: 8, province: "ขอนแก่น" },
  { name: "CrossFit Hat Yai", athletes: 7, province: "สงขลา" },
  { name: "CrossFit Udon", athletes: 6, province: "อุดรธานี" },
];

export const PROVINCE_STATS = [
  { province: "กรุงเทพฯ", athletes: 89, affiliates: 6 },
  { province: "เชียงใหม่", athletes: 34, affiliates: 3 },
  { province: "ภูเก็ต", athletes: 28, affiliates: 2 },
  { province: "ชลบุรี", athletes: 22, affiliates: 2 },
  { province: "นครราชสีมา", athletes: 18, affiliates: 2 },
  { province: "ขอนแก่น", athletes: 14, affiliates: 1 },
  { province: "สงขลา", athletes: 12, affiliates: 1 },
  { province: "อุดรธานี", athletes: 10, affiliates: 1 },
];

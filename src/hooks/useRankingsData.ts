import { useState, useEffect } from "react";

export interface RankingEntry {
  "TH Rank": string;
  "Reps Men": string;
  "Division Men": string;
  "Reps Women": string;
  "Division Women": string;
}

export interface RankingEntry26_2 {
  "Rank Men": string;
  "Division Men": string;
  "Score Men": string;
  "Rank Women": string;
  "Division Women": string;
  "Score Women": string;
}

export interface RankingEntry26_3 {
  "Rank": string;
  "Division Men": string;
  "Score Men": string;
  "Score Women": string;
  "Division Women": string;
}

export function useRankingsData(workoutId: "26.1" | "26.2" | "26.3") {
  const [data, setData] = useState<(RankingEntry | RankingEntry26_2 | RankingEntry26_3)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const filename =
          workoutId === "26.1" ? "thailand-26-1-rankings.csv" :
          workoutId === "26.2" ? "26.2 - Sheet1.csv" :
          "26.3 - Sheet1.csv";
        const response = await fetch(`/data/${filename}`);
        if (!response.ok) throw new Error("Failed to load CSV");
        
        const text = await response.text();
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          setData([]);
          return;
        }

        const headers = lines[0].split(',').map(h => h.trim());
        const parsed = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim());
          if (workoutId === "26.3") {
            return {
              "Rank":           values[headers.indexOf("Rank")]            || "",
              "Division Men":   values[headers.indexOf("Division Men")]    || "",
              "Score Men":      values[headers.indexOf("Score  Men")]      || values[headers.indexOf("Score Men")] || "",
              "Score Women":    values[headers.indexOf("Score Women")]     || "",
              "Division Women": values[headers.indexOf("Divsion women")]   || values[headers.indexOf("Division Women")] || "",
            } as RankingEntry26_3;
          } else if (workoutId === "26.1") {
            return {
              "TH Rank":       values[headers.indexOf("TH Rank")]       || "",
              "Reps Men":      values[headers.indexOf("Reps Men")]      || "",
              "Division Men":  values[headers.indexOf("Division Men")]  || "",
              "Reps Women":    values[headers.indexOf("Reps Women")]    || "",
              "Division Women":values[headers.indexOf("Division Women")]|| "",
            } as RankingEntry;
          } else {
            return {
              "Rank Men":      values[headers.indexOf("Rank Men")]      || "",
              "Division Men":  values[headers.indexOf("Division Men")]  || "",
              "Score Men":     values[headers.indexOf("Score Men")]     || "",
              "Rank Women":    values[headers.indexOf("Rank Women")]    || "",
              "Division Women":values[headers.indexOf("Division Women")]|| "",
              "Score Women":   values[headers.indexOf("Score Women")]   || "",
            } as RankingEntry26_2;
          }
        });

        setData(parsed);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [workoutId]);

  return { data, loading, error };
}

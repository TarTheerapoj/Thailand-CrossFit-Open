import { useState, useEffect } from "react";

export interface RankingEntry {
  "TH Rank": string;
  "Reps Men": string;
  "Division Men": string;
  "Reps Women": string;
  "Division Women": string;
}

export function useRankingsData() {
  const [data, setData] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/data/thailand-26-1-rankings.csv");
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
          const entry: any = {};
          headers.forEach((header, i) => {
            entry[header] = values[i] || "";
          });
          return entry as RankingEntry;
        });

        setData(parsed);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
}

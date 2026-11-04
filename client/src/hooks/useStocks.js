import { useState, useEffect, useCallback, useRef } from "react";

export function useStocks() {
  const [health, setHealth] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [countdown, setCountdown] = useState(60);
  const [flashKey, setFlashKey] = useState(0);

  const countdownRef = useRef(60);

  // Fetch stocks data from the backend
  const fetchStocks = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const [healthRes, stocksRes] = await Promise.all([
        fetch("/api/health"),
        fetch("/api/stocks"),
      ]);

      if (!healthRes.ok || !stocksRes.ok) {
        throw new Error("Unable to retrieve market data from backend");
      }

      const healthData = await healthRes.json();
      const stocksData = await stocksRes.json();

      setHealth(healthData);
      setStocks(stocksData);
      setLastUpdated(new Date());
      setFlashKey((prev) => prev + 1);
      setError(null);
      countdownRef.current = 60;
      setCountdown(60);
    } catch (err) {
      setError(err.message || "Error connecting to service");
    } finally {
      setLoading(false);
      if (isManual) setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchStocks();

    const intervalId = setInterval(() => {
      fetchStocks();
    }, 60000);

    const timerId = setInterval(() => {
      countdownRef.current =
        countdownRef.current > 0 ? countdownRef.current - 1 : 60;
      setCountdown(countdownRef.current);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(timerId);
    };
  }, [fetchStocks]);

  return {
    health,
    stocks,
    loading,
    refreshing,
    error,
    lastUpdated,
    countdown,
    flashKey,
    refresh: () => fetchStocks(true),
  };
}

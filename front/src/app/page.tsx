"use client"; 
import { useEffect, useState } from 'react';
import axios from "axios";

const Home = () => {
  const [contributions, setContributions] = useState<any[]>([]);
  const [init, setInit] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const res = await fetch('/api/github');
        if (res.ok) {
          setInit(true);
          setContributions([]);
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchContributions();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>GitHub Contributions</h1>
      <h2> {init && <p>初期状態</p>}</h2>
    </div>
  );
}
export default Home;

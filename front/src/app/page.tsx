"use client"; 
import { useEffect, useState } from 'react';
import { Chart } from "react-google-charts"
import Range from "./component/range";

// グラフのオプション
const options = {
  title: 'Git Contribution',
  hAxis: {
    title: 'Date',
  },
  vAxis: {
    title: 'Count',
  },
};

const Home = () => {
  const [contributions, setContributions] = useState<any[]>([]);
  const [init, setInit] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const res = await fetch('/api/github');
        if (res.ok) {
          const json = await res.json();
          console.log(json)
          setInit(true);
          setContributions(json);
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
      <Range load={setContributions}/>
      {
        init ? (
        <Chart
          chartType="ColumnChart"
          data={contributions}
          options={options}       // オプションを渡す
          width="100%"            // グラフの幅
          height="400px"          // グラフの高さ
        />
        ) 
        : (<h2>読み込み中</h2>)
      }
    </div>
  );
}
export default Home;

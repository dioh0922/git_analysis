"use client"; 
import { useState, useEffect } from 'react';
const Range = (props: any) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const onChangeFrom = (e: any) => {
    setFrom(e.target.value);
  } 
  const onChangeTo = (e: any) => {
    setTo(e.target.value);
  }
  const onClick = async () => {
    const params = new URLSearchParams({
      from: from,
      to: to,
    });
    try {
      const res = await fetch('/api/github?' + params.toString());
      if (res.ok) {
        const json = await res.json();
        console.log(json)
        props.load(json);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <h3>日付</h3>
      <label htmlFor="from-date">From</label>
      <input id="from-date" type="date" value={from} onChange={onChangeFrom}/>
      <label htmlFor="to-date">To</label>
      <input id="to-date" type="date" value={to} onChange={onChangeTo}/>
      <button onClick={onClick}>検索</button>
    </div>
  );
}
export default Range;

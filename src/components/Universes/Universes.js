import React, { useCallback, useEffect, useState } from "react";
import "./Universes.css";

const Universes = ({ stars, universeDetails }) => {
  const [universeCurrSize, setuniverseCurrSize] = useState(new Map());

  const  countStars = useCallback(()=> {
    let starMap = new Map();
    if (stars) {
      stars.map((val) => {
        const counter = starMap.get(val.universeId);
        if (counter) starMap.set(val.universeId, counter + 1);
        else starMap.set(val.universeId, 1);
      });
      return starMap;
    }
  },[stars]);

  useEffect(() => {
    const count = countStars();
    setuniverseCurrSize(count);
  }, [countStars]);

  return (
    <>
      <table className="universe">
        {universeDetails ? (
          <>
            <thead>
              <tr>
                <th className="header">Id</th>
                <th className="header">Max Size</th>
                <th className="header">Current Size</th>
                <th className="header">Name</th>
              </tr>
            </thead>
            <tbody>
              {universeDetails.map((val) => (
                <tr key={val.id}>
                  <td>{val.id}</td>
                  <td>{val.maxSize}</td>
                  <td>{universeCurrSize.get(val.id)}</td>
                  <td>{val.name}</td>
                </tr>
              ))}
            </tbody>
          </>
        ) : null}
      </table>
    </>
  );
};
export default Universes;

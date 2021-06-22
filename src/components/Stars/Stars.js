import React, { useCallback, useEffect, useState } from "react";

const Stars = ({ starDetails, universes }) => {
  const [universeName, setuniverseName] = useState(new Map());


  const getUniverseName = useCallback(
    (id) => {
      let universeMap = new Map();
      if (universes) {
        universes.map((val) => {
          const counter = universeMap.get(id);
          if (!counter) universeMap.set(val.id, val.name);
        });
        return universeMap;
      }
    },
    [universes]
  );

  useEffect(() => {
    const names = getUniverseName();
    setuniverseName(names);
  }, [getUniverseName]);
  return (
    <>
      <table className="universe">
        {starDetails ? (
          <>
            <thead>
              <tr>
                <th className="header">Id</th>
                <th className="header">Color</th>
                <th className="header">Name</th>
                <th className="header">Universe Id</th>
                <th className="header">Universe Name</th>
              </tr>
            </thead>
            <tbody>
              {starDetails.map((val) => (
                <tr key={val.id} style={{ color: val.color }}>
                  <td>{val.id}</td>
                  <td>{val.color}</td>
                  <td>{val.name}</td>
                  <td>{val.universeId}</td>
                  <td>{universeName.get(val.universeId)}</td>
                </tr>
              ))}
            </tbody>
          </>
        ) : null}
      </table>
    </>
  );
};
export default Stars;

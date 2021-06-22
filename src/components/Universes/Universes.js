import React, { useCallback, useEffect, useState } from "react";
import "./Universes.css";
import AddElement from "../AddElement/AddElement";
import Stars from "../Stars/Stars";

const universeObj = {
  id: 0,
  maxSize: 0,
  name: "",
};
const Universes = ({ stars, universeDetails, refresh }) => {
  const [universeCurrSize, setuniverseCurrSize] = useState(new Map());
  const [addUniverse, setaddUniverse] = useState(universeObj);
  const [getStars, setgetStars] = useState([]);
  const [selectedUniverse, getselectedUniverse] = useState(0);

  const countStars = useCallback(() => {
    let starMap = new Map();
    if (stars) {
      stars.map((val) => {
        const counter = starMap.get(val.universeId);
        if (counter) starMap.set(val.universeId, counter + 1);
        else starMap.set(val.universeId, 1);
      });
      return starMap;
    }
  }, [stars]);

  const changeHandler = (e) => {
    e.preventDefault();
    setaddUniverse({
      ...addUniverse,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let duplicate = false;
    universeDetails.map((value) => {
      if (value.id.toString() === addUniverse.id) {
        duplicate = true;
        alert("Universe already exists. Please give a new universe ID");
      }
    });
    if (duplicate === false) {
      const response = await fetch("http://localhost:1234/universes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Number(addUniverse.id),
          maxSize: Number(addUniverse.maxSize),
          name: addUniverse.name,
        }),
      });
      if (response.ok) {
        refresh();
      }
    }
  };
  const getAllStars = (e) => {
    e.preventDefault();
    const universeId = e.target.parentNode.parentNode.cells[0].innerText;
    const selectedStars = stars.filter(
      (val) => val.universeId === Number(universeId)
    );
    setgetStars(selectedStars);
    getselectedUniverse(universeId);
  };

  useEffect(() => {
    const count = countStars();
    setuniverseCurrSize(count);
  }, [countStars]);

  return (
    <div className="univereseContainer">
      {getStars.length > 0 ? (
        <>
          <div className="info">
            The List of Stars belonging to Universe Id -{selectedUniverse}
          </div>
          <Stars
            starDetails={getStars}
            universes={universeDetails}
            universeId={selectedUniverse}
          />
        </>
      ) : (
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
                      <td>
                        {universeCurrSize.get(val.id)
                          ? universeCurrSize.get(val.id)
                          : 0}
                      </td>
                      <td>
                        {universeCurrSize.get(val.id) > 0 ? (
                          <a onClick={(e) => getAllStars(e)} href="/Universes">
                            {val.name}
                          </a>
                        ) : (
                          val.name
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            ) : null}
          </table>
          <AddElement
            elementObj={addUniverse}
            handleChange={(e) => changeHandler(e)}
            handleSubmit={(e) => submitHandler(e)}
          />
        </>
      )}
    </div>
  );
};
export default Universes;

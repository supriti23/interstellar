import React, { useCallback, useEffect, useState } from "react";
import AddElement from "../AddElement/AddElement";
import "./Stars.css";

const starObj = {
  color: "",
  id: 0,
  name: "",
  universeId: 0,
};
const Stars = ({ starDetails, universes, refresh, universeId }) => {
  const [universeName, setuniverseName] = useState(new Map());
  const [addStar, setaddStar] = useState(starObj);

  const changeHandler = (e) => {
    e.preventDefault();
    setaddStar({
      ...addStar,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let exists = false;
    universes.map((value) => {
      if (value.id.toString() === addStar.universeId) {
        exists = true;
      }
    });
    if (exists === true) {
      try {
        const response = await fetch("http://localhost:1234/stars", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            color: addStar.color,
            id: Number(addStar.id),
            name: addStar.name,
            universeId: Number(addStar.universeId),
          }),
        });
        if (response.ok) refresh();
        else alert(response.statusText);
      } catch (err) {
        alert(err);
      }
    } else
      alert("Universe does not exists. Please give an existing universe ID");
  };
  const deleteStar = async (e) => {
    const starId = e.target.parentNode.parentNode.cells[0].innerText;
    try {
      const deleteResponse = await fetch(
        "http://localhost:1234/stars/" + starId,
        {
          method: "DELETE",
        }
      );
      if (deleteResponse.ok) refresh();
    } catch (err) {
      alert(err);
    }
  };

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
    <div className="univereseContainer">
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
                {universeId ? null : <th className="header">Delete</th>}
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
                  {universeId ? null : (
                    <td>
                      <button
                        className="deleteButton"
                        onClick={(e) => deleteStar(e)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </>
        ) : null}
      </table>
      {!universeId ? (
        <AddElement
          elementObj={addStar}
          handleChange={(e) => changeHandler(e)}
          handleSubmit={(e) => submitHandler(e)}
        />
      ) : null}
    </div>
  );
};
export default Stars;

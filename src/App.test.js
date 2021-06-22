import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { getUniverses, getStars } from "./components/ApiData";

describe("Testing whether Main  Component is rendering without crashing", () => {
  const universeList = [
    {
      id: 333,
      maxSize: 3,
      name: "Big universe",
    },
  ];
  const starList = [
    {
      color: "RED",
      id: 123,
      name: "My happy star 123",
      universeId: 333,
    },
    {
      color: "YELLOW",
      id: 321,
      name: "321 is myy happy star",
      universeId: 333,
    },
  ];

  test("Testing App component Home Page  ", async () => {
    render(<App />);
    const home = screen.getByText("Hello World!");
    expect(home).toBeInTheDocument;
  });

  test("Testing App component is fetching data on clicking universes/stars in the nav bar ", async () => {
    render(<App />);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(universeList),
      })
    );

    //firing cilck event on Universes in the nav bar
    const universe = screen.getByText("Universes");
    expect(universe).toBeInTheDocument;
    fireEvent.click(universe);

    //checking the mock response
    const universeResponse = await getUniverses();
    expect(fetch).toHaveBeenCalled();
    expect(universeResponse).toHaveLength(1);

    //firing cilck event on Stars in the nav bar
    const star = screen.getByText("Stars");
    expect(star).toBeInTheDocument;
    fireEvent.click(star);

    //checking the mock response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(starList),
      })
    );
    const starResponse = await getStars();
    expect(fetch).toHaveBeenCalled();
    expect(starResponse).toHaveLength(2);
  });
});

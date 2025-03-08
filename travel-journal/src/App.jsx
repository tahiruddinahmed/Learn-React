import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Entry from "./components/Entry.jsx";
import Data from "./data.js";

function App() {
  const entries = Data.map((entry) => {
    return (
      <Entry
        key={entry.id}
        img={entry.img}
        country={entry.country}
        title={entry.title}
        googleMapsLink={entry.googleMapsLink}
        date={entry.dates}
        text={entry.text}
      />
    );
  });

  return (
    <>
      <Header />
      <div className="container">{entries}</div>
    </>
  );
}

export default App;

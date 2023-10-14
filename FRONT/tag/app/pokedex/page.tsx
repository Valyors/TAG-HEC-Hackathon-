"use client";
import React, { useContext, useEffect, useState } from "react";
export default function Pokedex() {
  return (
    <div className="w-full">
      <div id="rechercher">
        <input
          className="barre_recherche"
          type="text"
          id="searchInput"
          placeholder="Rechercher"
        />
      </div>

      <div className="list-pokedex h-screen overflow-y-auto pb-20">
        {/* {peopleArray.map((item) => (
          <>
          <ProfileCard key={item.address} people={item}/>
          </>
        ))} */}
      </div>
    </div>
  );
}

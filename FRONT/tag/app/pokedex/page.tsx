"use client"
import React,{useContext,useEffect,useState} from 'react';
import {PeopleContext} from '@/components/people-provider';
import ProfileCard from '@/components/profile-card';

export default function Pokedex() {
  const {peopleArray,setPeopleArray} = useContext(PeopleContext);
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
        {peopleArray.map((item) => (
          <>
          <ProfileCard key={item.address} people={item}/>
          </>
        ))}
      </div>
    </div>
  );
}

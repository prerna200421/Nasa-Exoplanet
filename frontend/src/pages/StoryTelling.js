import React, { useEffect, useState } from 'react';
import "./styles/StoryTelling.css";

function StoryTelling() {
  const [hoveredProfile, setHoveredProfile] = useState(null);

  useEffect(() => {
    const profiles = document.querySelectorAll('.profile');
    profiles.forEach((profile, index) => {
      profile.style.animationDelay = `${index * 0.3}s`; 
    });

    const timelineEvents = document.querySelectorAll('.timeline-event');
    timelineEvents.forEach((event, index) => {
      event.style.animationDelay = `${index * 0.3}s`; 
    });
  }, []);

  const profilesData = [
    {
      name: "Dr. Michel Mayor",
      img: "images/Michel_Mayor.jpg",
      fact: "Fun Fact: This discovery was the first evidence of an exoplanet orbiting a sun-like star!",
      description: "In 1995, Dr. Michel Mayor and his dedicated team reshaped our understanding of the cosmos by discovering 51 Pegasi b, the first exoplanet orbiting a sun-like star, using the technique of radial velocity."
    },
    {
      name: "Dr. Didier Queloz",
      img: "images/Queloz.jpg",
      fact: "Fun Fact: They shared the Nobel Prize in Physics in 2019 for their work.",
      description: "Alongside Dr. Mayor, Dr. Didier Queloz shared the excitement of discovering a new planet that challenged existing theories of planetary formation, earning them a joint Nobel Prize in Physics in 2019."
    },
    {
      name: "Dr. Sara Seager",
      img: "images/Sara_Seager.jpg",
      fact: "Fun Fact: She has a popular TED talk on the search for life on other planets.",
      description: "Dr. Sara Seager dedicated her career to studying exoplanets and searching for potentially habitable worlds, making crucial contributions to understanding exoplanet atmospheres."
    },
    {
      name: "Dr. Natalie Batalha",
      img: "images/Natalie_Batalha.jpg",
      fact: "Fun Fact: The Kepler mission discovered over 2,600 exoplanets!",
      description: "As a leader of the Kepler mission, Dr. Natalie Batalha played a pivotal role in discovering thousands of exoplanets, inspiring many to explore new horizons beyond Earth."
    },
  ];

  const timelineData = [
    { date: "1995", event: "Discovery of 51 Pegasi b, the first exoplanet around a sun-like star." },
    { date: "2009", event: "Launch of the Kepler Space Telescope, discovering thousands of exoplanets." },
    { date: "2019", event: "First image of a black hole, enriching exoplanetary research." },
    { date: "2020", event: "TESS discovers multiple new exoplanets." },
    { date: "2021", event: "James Webb Space Telescope launched, set to revolutionize exoplanet studies." },
    { date: "2022", event: "Detection of the first exoplanet atmosphere using JWST." },
  ];

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>Discover Exoplanets with Scientists</h1>
      </header>

      
      
      <section className="main-content">
        <div className="intro">
          <h2>How Scientists Discover New Worlds</h2>
          <p>Join us as we uncover the groundbreaking stories of scientists who have revealed the mysteries of exoplanets!</p>
        </div>

        <div className="profiles">
          {profilesData.map((profile, index) => (
            <div 
              className="profile" 
              key={index}
              onMouseEnter={() => setHoveredProfile(index)}
              onMouseLeave={() => setHoveredProfile(null)}
            >
              {hoveredProfile === index ? (
                <div className="fun-fact">{profile.fact}</div>
              ) : (
                <img src={`\\${profile.img}`} alt={profile.name} />
              )}
              <h3>{profile.name}</h3>
              <p>{profile.description}</p>
            </div>
          ))}
        </div>

     


        <div className="timeline">
          <h2>Key Discoveries in Exoplanet Research</h2>
          {timelineData.map((item, index) => (
            <div className="timeline-event" key={index}>
              <span className="event-date">{item.date}</span>
              <div className="event-description">{item.event}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default StoryTelling;

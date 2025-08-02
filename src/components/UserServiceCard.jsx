import React, { useState } from "react";
import yogaIcon from "../assetes/welleness.png";
import meditationIcon from "../assetes/welleness1.png";
import customSessionIcon from "../assetes/wellness3.png";
import exerciseIcon from "../assetes/wellness4.png";

import { useNavigate } from "react-router-dom";

const cardData = [
  {
    img: meditationIcon,
    title: "Yoga Sessions",
    buttonText: "Explore Yoga",
    pageRoute: "/yoga-session",
    text: "Discover guided yoga sessions to improve flexibility, strength, and mental focus.",
  },
  {
    img: yogaIcon,
    title: "Meditation",
    buttonText: "Start Meditating",
    pageRoute: "/meditation-session",
    text: "Practice mindfulness and reduce stress with our calming meditation guides.",
  },
  {
    img: customSessionIcon,
    title: "Create Custom Session",
    buttonText: "Start Creating",
    pageRoute: "/add-session",
    text: "Design and share your own wellness sessions—accessible to all registered users.",
  },
  {
    img: exerciseIcon,
    title: "Bodyweight Exercises",
    buttonText: "Start Workout",
    pageRoute: "/exercise-session",
    text: "Stay fit with simple bodyweight exercises you can do anytime, anywhere.",
  },
];

function UserServiceCard() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const handlePrev = () => {
    const newIndex = index === 0 ? cardData.length - 1 : index - 1;
    setIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = index === cardData.length - 1 ? 0 : index + 1;
    setIndex(newIndex);
  };

  const visibleCards = [
    cardData[(index - 1 + cardData.length) % cardData.length],
    cardData[index],
    cardData[(index + 1) % cardData.length],
  ];

  return (
    <div className="carousel-container p-4">
      <div>
        <button className="carousel-control prev" onClick={handlePrev}>
          ‹
        </button>
      </div>

      <div
        className="carousel-inner p-2 d-flex justify-content-center "
        style={{ width: "80%" }}
      >
        {visibleCards.map((card, i) => (
          <div
            data-aos="fade-up"
            key={i}
            className={`card-container ${i === 1 ? "active" : ""}`}
            style={{
              transform: i === 1 ? "scale(1)" : "scale(0.9)",
              transition: "transform 0.4s ease-in-out",
              margin: "0 10px",
            }}
          >
            <div
              className="card rounded shadow p-3 border-0"
              style={{ width: "20rem" }}
            >
              <img
                src={card.img}
                className="card-img-top"
                alt={card.title}
                style={{ height: "10rem", objectFit: "contain" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.text}</p>
                <button
                  className="btn btn-success w-100"
                  onClick={() => {
               
                    navigate(card.pageRoute);
                    
                  }}
                >
                  {card.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button className="carousel-control next" onClick={handleNext}>
          ›
        </button>
      </div>
    </div>
  );
}

export default UserServiceCard;

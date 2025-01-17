import React, { useState } from 'react';
import './StoryTabs.css'; // Import file CSS untuk styling

const StoryTabs = ({ stories }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="story-tabs-container">
      <div className="story-indicators">
        {stories.map((story, index) => (
          <div
            key={index}
            className={`indicator ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
          ></div>
        ))}
      </div>
      <div
        className="story-content"
        style={{ backgroundImage: stories[activeIndex].backgroundImage, backgroundSize: 'cover' }}
      >
        {stories[activeIndex].content}
      </div>
    </div>
  );
};

export default StoryTabs;

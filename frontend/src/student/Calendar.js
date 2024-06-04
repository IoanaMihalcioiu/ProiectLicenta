import React from 'react'

function Calendar() {
  return (
      <div>
      <iframe src="https://calendar.google.com/calendar/embed?src=eab0b961d9fbf6399e54f37032fd55a567f609f9a51850ffd1dcfb7331a769b7%40group.calendar.google.com&ctz=Europe%2FBucharest" 
              style={{border: 0, width:800, height:600, frameborder:'0', scrolling: 'no' }}
              ></iframe>
      </div>
  );
};

export default Calendar

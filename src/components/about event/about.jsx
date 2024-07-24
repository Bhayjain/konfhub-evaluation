import React from 'react';
import "./about.css"

const images = [
  'https://www.gstatic.com/webp/gallery/1.jpg',
  'https://www.gstatic.com/webp/gallery/2.jpg',
  'https://www.gstatic.com/webp/gallery/5.jpg',
  'https://www.gstatic.com/webp/gallery/4.jpg',
  'https://www.gstatic.com/webp/gallery/5.jpg',
  'https://www.gstatic.com/webp/gallery/1.jpg',
  'https://www.gstatic.com/webp/gallery/2.jpg',
  'https://www.gstatic.com/webp/gallery/1.jpg',
  'https://www.gstatic.com/webp/gallery/4.jpg',
];
const data = [
  ['A', 'B', 'C'],
  ['A1', 'B1', 'C1'],
  ['A2', 'B2', 'C2'],
];



const About = () => {
  return (
    <div style={{ textAlign: "left", marginTop: "30px" }}>
      <h3>ABOUT EVENT</h3>
      <p style={{ marginTop: "30px" }}>
        This is the description of an event. This event was created as an evaluation task for the role of Frontend Engineer. Are you the one we are looking for? Don't get nervous. Take help if you need. Ask us more questions if you did not understand the problem. You can reach us at reachus@konfhub.com.
      </p>

      <div className="grid-gallery" style={{ marginTop: "30px" }}>
        {images.map((image, index) => (
          <div className="image-item" key={index}>
            <img src={image} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>

      <section className="video-section" style={{ marginTop: "30px" }}>

        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/bEM35JDYjrI"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </section>

      <div className="table-container">
        <table className="styled-table">
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>








  );
}

export default About;

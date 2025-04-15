import { useState } from "react";
export default function Main() {
  /**
   * Challenge: move the hardcoded meme info into React
   * state. Use an object wit `topText`, `bottomText`,
   * and `image` properties, and set the initial values to
   * the ones hardcoded below.
   */
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into mordor",
    image: "http://i.imgflip.com/1bij.jpg",
  });

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input type="text" placeholder="One does not simply" name="topText" />
        </label>

        <label>
          Bottom Text
          <input type="text" placeholder="Walk into mordor" name="bottomText" />
        </label>
        <button>Get a new meme image 🖼</button>
      </div>

      <div className="meme">
        <img src={meme.image} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}

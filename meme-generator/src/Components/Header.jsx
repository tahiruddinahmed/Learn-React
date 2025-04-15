import TrollFace from '../assets/Troll-Face.png'
export default function header() {
  return (
    <header className="header">
      <img 
        src={TrollFace}
        alt="" 
        />
        <h1>Meme Generator</h1>
    </header>
  );
}

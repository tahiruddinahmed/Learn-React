
export default function Entry(props) {
    const {...entry} = props.entry;
    return (
        <article className="journal-entry">
            <div className="cover-image">
                <img src={entry.img.src} alt={entry.img.alt} />
            </div>
            <div className="main-content">
                <div className="top-content">
                    <i class="fa-solid fa-location-dot"></i>
                    <span className="country-name">{entry.country}</span>
                    <a href={entry.googleMapsLink} target="_blank">View on Google Maps</a>
                    <h2 className="location-name">{entry.title}</h2>
                </div>
                <div className="bottom-content">
                    <p className="date">{entry.date}</p>
                    <p className="desc">{entry.text}</p>
                </div>
            </div>
        </article>
    )
}
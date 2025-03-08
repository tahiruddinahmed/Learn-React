
export default function Entry(props) {
    return (
        <article className="journal-entry">
            <div className="cover-image">
                <img src={props.img.src} alt={props.img.alt} />
            </div>
            <div className="main-content">
                <div className="top-content">
                    <i class="fa-solid fa-location-dot"></i>
                    <span className="country-name">{props.country}</span>
                    <a href={props.googleMapsLink} target="_blank">View on Google Maps</a>
                    <h2 className="location-name">{props.title}</h2>
                </div>
                <div className="bottom-content">
                    <p className="date">{props.date}</p>
                    <p className="desc">{props.text}</p>
                </div>
            </div>
        </article>
    )
}

export default function Entry() {
    return (
        <article className="journal-entry">
            <div className="cover-image">
                <img src="https://scrimba.com/links/travel-journal-japan-image-url" alt="Mount Fuji" />
            </div>
            <div className="main-content">
                <div className="top-content">
                    <i class="fa-solid fa-location-dot"></i>
                    <span className="country-name">JAPAN</span>
                    <a href="https://www.google.com/maps/place/Mount+Fuji/@35.3606421,138.7170637,15z/data=!3m1!4b1!4m6!3m5!1s0x6019629a42fdc899:0xa6a1fcc916f3a4df!8m2!3d35.3606255!4d138.7273634!16zL20vMGNrczA?entry=ttu
" className="google-link" target="_blank">View on Google Maps</a>
                    <h2 className="location-name">Mount Fuji</h2>
                </div>
                <div className="bottom-content">
                    <p className="date">12 Jan, 2021 - 24 Jan, 2021</p>
                    <p className="desc">
                    Mount Fuji is the tallest mountain in Japan, standing at 3,776 meters (12,380 feet). Mount Fuji is the single most popular tourist site in Japan, for both Japanese and foreign tourists.
                    </p>
                </div>
            </div>
        </article>
    )
}
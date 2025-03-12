export default function Header(props) {
    
    return (
        <header className="header">
            <img src={props.img} alt="" />
            <p>{props.title}</p>
        </header>
    )
}
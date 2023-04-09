import { Link } from "react-router-dom"

const HomeBtn = () => {
    return (
        <Link to="/">
            <button className="homeBtn">HOME</button>
        </Link>
    )
}

export default HomeBtn

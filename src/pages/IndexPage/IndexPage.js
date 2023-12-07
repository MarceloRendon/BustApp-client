import { Link } from "react-router-dom"

const IndexPage = () => {
    return (
        <main>
            <h1>Bienvenido a la coasters MERN</h1>
            <hr />
            <Link to="/galeria">Ver galería</Link>
            <Link to="/paradero">Ver paradero</Link>
        </main>
    )
}

export default IndexPage
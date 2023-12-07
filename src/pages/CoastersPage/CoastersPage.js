import { useState } from "react"
import { Link } from "react-router-dom"

import './CoastersPage.css'

const CoastersPage = () => {

    const [coasters, setCoasters] = useState([])

    const loadCoasters = () =>{

        fetch('http://localhost:5005/api/coaster')
            .then(res => res.json())
            .then(allCoasters => setCoasters(allCoasters))
    }

    loadCoasters()

    return (
        <main>
            <h1>Esta sera la lista</h1>
            <hr />
            {coasters.map(eachCoaster => {
                return (
                    <Link to={`/detalles/${eachCoaster._id}`}>
                        <article className="coaster-card">
                            <img src={eachCoaster.imageUrl}></img>
                            <h3>{eachCoaster.title}</h3>
                        </article>
                    </Link>
                )
            })}
            <Link to="/">Volver a inicio</Link>
        </main>
    )
}

export default CoastersPage
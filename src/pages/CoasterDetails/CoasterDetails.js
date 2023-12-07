import { useState } from "react"
import { Link, useParams } from "react-router-dom"


const CoastersDetails = () => {

    const {coaster_id} = useParams()
    const [coaster, setCoaster] = useState([])

    const LoadCoasterDetails = () => {
        fetch(`http://localhost:5005/api/details/${coaster_id}`)
        .then(response => response.json())
        .then(coaster => setCoaster(coaster))
    }

    LoadCoasterDetails()

    return (
        <main className="coaster-details">
            <h1>Esto seran los detalles del ID {coaster.title}</h1>
            <hr />

            <img src={coaster.imageUrl} style={{display: 'inline-block', width: '40%'}}/>

            
            <article style={{display: 'inline-block', width: '40%'}}>
                <p>{coaster.description}</p>
                <h3>Speecs</h3>
                <ul>
                    <il>Longitud: {coaster.length}</il>
                    <li>Altura: {coaster.height}</li>
                </ul>
                
                <Link to="/">Volver a inicio</Link>
            </article>
           
    

            
        </main>
    )
}

export default CoastersDetails
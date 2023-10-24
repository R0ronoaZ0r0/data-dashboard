import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";



const Info = () => {
    let params = useParams();
    console.log(params.symbol);
    const [fullDetails, setFullDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let response = await axios.get(`https://api.openbrewerydb.org/v1/breweries?by_ids=${params.symbol}`);
            setFullDetails(response.data);
            console.log(response.data[0]);
        }
        fetchData();
        
    },[params.symbol]);

    return(
        <div>
            <h1>Info</h1>
            <h3>Full details of the brewery</h3>
            {fullDetails && fullDetails.map((item, index) => (
                <div key={index}>
                    <p>Name: {item.name}</p>
                    <p>Brewery Type: {item.brewery_type}</p>
                    <p>Street: {item.street}</p>
                    <p>City: {item.city}</p>
                    <p>State: {item.state}</p>
                    <p>Postal Code: {item.postal_code}</p>
                    <p>Country: {item.country}</p>
                    <p>Longitude: {item.longitude}</p>
                    <p>Latitude: {item.latitude}</p>
                    <p>Phone: {item.phone}</p>
                    <p>URL: {item.website_url}</p>
                    <Link to="/">Back</Link>
                    
                </div>
            ))}
        </div>
    );
};

export default Info;
import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
    const [data, setData] = useState(null);
    const [closedCount, setClosedCount] = useState(null);
    const [filterCount, setFilterCount] = useState(8211);
    const [answer, setAnswer] = useState("");
    const [selectedOption, setSelectedOption] = useState("");



    useEffect(() => {
        const fetchData = async () => {
        let response = await axios.get(`https://api.openbrewerydb.org/v1/breweries?per_page=8000`);
        setData(response.data);
        console.log(response.data);
        }
        const fetchDataClosed = async () => {
        let response = await axios.get(`https://api.openbrewerydb.org/v1/breweries/meta?by_type=closed`);
        setClosedCount(response.data.total);
        }
        fetchData();
        fetchDataClosed();
    },[]);


    const fetchSearchData = async () => {
        let response = await axios.get(`https://api.openbrewerydb.org/v1/breweries?by_name=${answer}&per_page=8000`);
        setData(response.data);
        let responseCount= await axios.get(`https://api.openbrewerydb.org/v1/breweries/meta?by_name=${answer}`);
        setFilterCount(responseCount.data.total);
    }


    const handleOnSubmit = (e) => {
        e.preventDefault();
        fetchSearchData();
    }

    const handleOnSelect = async (e) => {
        e.preventDefault();
        let response = await axios.get(`https://api.openbrewerydb.org/v1/breweries?by_type=${selectedOption}&per_page=8000`);
        setData(response.data);
        let responseCount= await axios.get(`https://api.openbrewerydb.org/v1/breweries/meta?by_type=${selectedOption}`);
        setFilterCount(responseCount.data.total);
    }

    const handleSort = async () => {
        let response = await axios.get(`https://api.openbrewerydb.org/v1/breweries?sort=type,name:asc&per_page=8000`);
        setData(response.data);
    }



    return (
        <div>
        <h1>Brewery Data</h1>

        <div className='stats-container'>
            <div className='stats'>
            Total Number of Breweries: 8211
            </div>
            <div className='stats'>
            Number of Breweries based on your filter: {filterCount}
            </div>
            <div className='stats'>
            Total Number of Closed Breweries: {closedCount}
            </div>
        </div>

        <div className='search-container'>
            <form onSubmit={handleOnSubmit}>
                <input 
                
                    type="text" 
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder='search by name'
                />
                
                <button type="submit">submit</button>
            </form>
        </div>

        <div className='filter-container'>
            <form onSubmit={handleOnSelect}>
            <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                <option value=''>Filter by type</option>
                <option value='micro'>micro</option>
                <option value='nano'>nano</option>
                <option value='regional'>regional</option>
                <option value='brewpub'>brewpub</option>
                <option value='large'>large</option>
                <option value='planning'>planning</option>
                <option value='bar'>bar</option>
                <option value='contract'>contract</option>
                <option value='proprietor'>proprietor</option>
                <option value='closed'>closed</option>
            </select>
            <button type='submit'>filter</button>
            </form>
        </div>

        <div className='sort-button'>
            <button onClick={handleSort}>Sort by Type</button>
        </div>
        
        {data && (
            <table style={{margin: 'auto'}}>
            <thead>
                <tr>
                <th>Name</th>
                <th>City</th>
                <th>State</th>
                <th>Type</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.city}</td>
                    <td>{item.state}</td>
                    <td>{item.brewery_type}</td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
    );
};

export default Home;
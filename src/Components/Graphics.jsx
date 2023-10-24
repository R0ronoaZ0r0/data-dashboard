import {BarChart, Bar, XAxis, YAxis, Legend, Tooltip} from 'recharts';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Graphics = () => {

  const [data, setData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const counts = [];
      const types = ['micro', 'nano', 'regional', 'brewpub', 'large', 'planning', 'bar', 'contract', 'proprietor', 'closed'];
      for (const type of types) {
        let response = await axios.get(`https://api.openbrewerydb.org/v1/breweries/meta?by_type=${type}`);
        counts.push({type: type, count: response.data.total});
      }
      setData(counts);
      console.log(counts);
    };
    fetchData();
    
  },[]);



    return (
        <div>
          <h3>Bar Chart showing the number of breweries by type.</h3>
          <BarChart width={800} height={500} data={data}>
              <XAxis dataKey="type"  />
              <YAxis/>
              <Legend/>
              <Bar dataKey="count" barSize={30} fill="#8884d8" />
              <Tooltip />
          </BarChart>
        </div>
    );
};

export default Graphics;
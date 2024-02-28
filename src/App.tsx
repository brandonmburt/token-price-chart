import { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from './Chart';
import { TokenPairData } from './models';
import TokenPairInfo from './TokenPairInfo';
import {
    generateEncodedQuery,
    generateTokenPairData,
    generatePairInfo
} from './utils';

const fetchPriceData = (encodedQuery: string): Promise<any> => {
    return axios.get(`https://app.astroport.fi/api/trpc/charts.prices?input=${encodedQuery}`)
}

export default function App() {

    const [data, setData] = useState<TokenPairData>(null);
    const [error, setError] = useState<string>(null);

    /** Hard coding variables but code is structured such that we should be able to retrieve data for any existing pairs */
    const tokenSymbol = 'ATOM', denomTokenSymbol = 'NTRN';

    useEffect(() => {
        fetchPriceData(generateEncodedQuery(tokenSymbol, denomTokenSymbol, 'neutron-1', 'D7'))
            .then (res => res.data.result.data.json)
            .then(data => setData(generateTokenPairData(data, tokenSymbol, denomTokenSymbol)))
            .catch(e => setError(e.message + '. Please refresh the page to try again.'));
    }, []);

    return (
        <div>
            {data && !error ? (
                    <>
                        <TokenPairInfo {...generatePairInfo(data)} />
                        <Chart data={data} />    
                    </>
                ) : <h1>Loading...</h1>
            }
            {error && <p>{error}</p>}
        </div>
    );
}
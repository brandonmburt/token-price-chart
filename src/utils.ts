import { SeriesItem, TokenPairData, TokenPairProps } from './models';

const TOKENS_IDs: Record<string, string> = {
    ATOM: 'ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9',
    NTRN: 'untrn'
};

export const generateEncodedQuery = (token: string, denomToken: string, chainId: string, dateRange: string): string => {
    const params = {
        json: {
            tokens: [TOKENS_IDs[token], TOKENS_IDs[denomToken]],
            chainId,
            dateRange,
        },
    };
    return encodeURIComponent(JSON.stringify(params));
}

export const generateTokenPairData = (data, tokenSymbol, denomTokenSymbol): TokenPairData => {
    const { 
        [TOKENS_IDs[tokenSymbol]]: tokenData,
        [TOKENS_IDs[denomTokenSymbol]]: denomTokenData
    } = data;

    /** Assumption: series times will be equivalent */
    const denomSeriesMap: Map<number, number> = denomTokenData.series.reduce((acc, { time, value }) => {
        acc.set(time, value);
        return acc;
    }, new Map());
    
    const pairData: TokenPairData = {
        tokenSymbol,
        denomTokenSymbol,
        series: tokenData.series.filter(({ time }) => denomSeriesMap.has(time)).map(({ time, value }) => {
            return {
                time,
                value: +(value / denomSeriesMap.get(time)).toFixed(2),
                date: new Date(+(time.toString() + '000'))
            }
        })
    };

    return pairData;
}

export const generatePairInfo = (data: TokenPairData): TokenPairProps => {
    const { tokenSymbol, denomTokenSymbol, series } = data;
    return {
        token: tokenSymbol,
        denomToken: denomTokenSymbol,
        avgPrice: (series.reduce((acc, s) => acc + s.value, 0) / series.length).toFixed(2),
        maxPrice: Math.max(...series.map(s => s.value)).toFixed(2),
        minPrice: Math.min(...series.map(s => s.value)).toFixed(2),
        startDate: series[0].date.toLocaleDateString(),
        endDate: series[series.length - 1].date.toLocaleDateString(),
    }
}

export const formatSeriesData = (series: SeriesItem[]) => {
    return series.map(item => {
        const [month, day, year] = item.date.toLocaleDateString().split('/');
        return {
            date: item.date,
            xAxis: [month, day, year.substring(2, 4)].join('/'),
            value: item.value,
        }  
    });
}
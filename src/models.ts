export interface TokenPairData {
    tokenSymbol: string;
    denomTokenSymbol: string;
    series: SeriesItem[];
}

export interface SeriesItem {
    time: number;
    value: number;
    date: Date;
}

export interface TokenPairProps {
    token: string;
    denomToken: string;
    avgPrice: string;
    maxPrice: string;
    minPrice: string;
    startDate: string;
    endDate: string;
}
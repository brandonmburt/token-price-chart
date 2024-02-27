import { TokenPairProps } from "./models";

export default function TokenPairInfo(props: TokenPairProps) {

    return (
        <div id='pair-info'>
            <h1>${props.token}-${props.denomToken}</h1>
            <p>Viewing price data for {props.startDate} - {props.endDate}</p>
            <p>Max Price: ${props.maxPrice}</p>
            <p>Min Price: ${props.minPrice}</p>
            <p>Average Price: ${props.avgPrice}</p>
        </div>
    );
}
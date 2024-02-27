import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TokenPairData } from './models';
import { formatSeriesData } from './utils';

const CustomTooltip = (props) => {
    if (props.active) {
        const { payload } = props;
        return (
            <div className="custom-tooltip">
                <p>{} {payload[0].payload.date.toLocaleString()}</p>
                <p>{`$${payload[0].value} ${props.tokenLabel}`}</p>
            </div>
        );
    }
    return null;
}

export function Chart({ data }: { data: TokenPairData}) {

    const { tokenSymbol, denomTokenSymbol, series } = data;
    const yAxisLabel = `${tokenSymbol} / ${denomTokenSymbol}`;

    return (
        <div id='chart-container'>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={formatSeriesData(series)}
                    margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="xAxis" label={{ value: 'Date', position: 'insideBottom', offset: -15 }} />
                    <YAxis label={{ value: yAxisLabel, angle: -90, position: 'outsideLeft' }} />
                    <Tooltip content={<CustomTooltip tokenLabel={yAxisLabel} />} />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    );
}
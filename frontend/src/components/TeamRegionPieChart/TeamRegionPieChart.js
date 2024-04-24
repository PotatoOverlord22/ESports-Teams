import { PieChart } from '@mui/x-charts/PieChart';

export default function RegionPieChart({ data }) {

    const convertData = (data) => {
        let id = 0;
        return Object.entries(data).map(([region, count]) => ({
            id: id++,
            value: count,
            label: region,
        }));
    }

    return (
        <PieChart
            series={[
                {
                    data: convertData(data),
                },
            ]}
            width={400}
            height={200}
        />
    )
}
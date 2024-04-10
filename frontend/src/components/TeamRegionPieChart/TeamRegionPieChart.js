import { PieChart } from '@mui/x-charts/PieChart';

export default function RegionPieChart({ data }) {

    return (
        <PieChart
            series={[
                {
                    data: data,
                },
            ]}
            width={400}
            height={200}
        />
    )
}
import { PieChart } from '@mui/x-charts/PieChart';
import { Paper } from '@mui/material';

export default function RegionPieChart({ listOfTeams }) {
    const generatePieChartData = (teamsList) => {
        const regionsCount = {};
        teamsList.forEach(team => {
            // if this is undefined it adds 1, else increments it, hence the || 0
            regionsCount[team.region] = (regionsCount[team.region] || 0) + 1;
        });
        let id = 0;
        return Object.keys(regionsCount).map(region => ({
            id: id++,
            value: regionsCount[region],
            label: region,
        }));
    }


    return (
        <PieChart
            series={[
                {
                    data: generatePieChartData(listOfTeams),
                },
            ]}
            width={400}
            height={200}
        />
    )
}
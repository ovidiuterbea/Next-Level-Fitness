import { Pie } from "react-chartjs-2";

const PieChart = (props) => {
  return (
    <Pie
      data={{
        labels: props.labels,
        datasets: [
          {
            label: "# of votes",
            data: props.data,
            backgroundColor: props.backgroundColor,
            borderColor: props.borderColor,
            borderWidth: 1,
            hoverBorderWidth: 5,
          },
        ],
      }}
      height={100}
      width={150}
      options={{
        maintainAspectRatio: true,
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        legend: {
          labels: {
            fontSize: 25,
          },
        },
      }}
    />
  );
};

export default PieChart;

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
            backgroundColor: [
              "rgba(205, 127, 50, 0.5)",
              "rgba(192, 192, 192, 0.5)",
              "rgba(255, 215, 0, 0.5)",
              "rgba(185, 242, 255, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
            ],
            borderColor: [
              "rgba(205, 127, 50, 1)",
              "rgba(192, 192, 192, 1)",
              "rgba(255, 215, 0, 1)",
              "rgba(185, 242, 255, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }}
      height={200}
      width={300}
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

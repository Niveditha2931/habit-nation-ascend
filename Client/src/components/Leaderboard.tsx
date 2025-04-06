import { Card, CardContent } from "@/components/ui/card"
import { Bar, Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend)

const scoreData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Score',
      data: [1500, 1800, 2000, 1700, 1600, 1900],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
    },
  ],
};

const submissionData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Submissions',
      data: [5, 6, 7, 8, 9, 10, 11],
      borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
    },
  ],
};

const lineData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Activity',
      data: [10, 20, 15, 30, 25, 35, 40],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const barData = {
  labels: ['Coding', 'Workout', 'Reading', 'Meditation'],
  datasets: [
    {
      label: 'Hours',
      data: [12, 5, 8, 3],
      backgroundColor: ['#6366f1', '#f97316', '#10b981', '#ec4899'],
    },
  ],
};

const Leaderboard = () => {
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Activity Over the Week',
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Category-wise Hours',
      },
    },
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Activity Heatmap</h2>

      <Card>
        <CardContent className="p-4">
          <Line data={lineData} options={lineOptions} />
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mt-10 mb-4">Category-wise Stats</h2>

      <Card>
        <CardContent className="p-4">
          <Bar data={barData} options={barOptions} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Leaderboard

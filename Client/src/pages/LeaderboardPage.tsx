import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Flame } from 'lucide-react';

const generateYearHeatmapData = () => {
  const data = [];
  const startDate = new Date('2024-01-01'); // Start of the year
  const endDate = new Date('2024-12-31'); // End of the year
  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    data.push({
      date: d.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 5), // Random activity count
    });
  }
  return data;
};

const heatmapData = generateYearHeatmapData();

const LeaderboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Profile Section */}
      <div className="bg-gray-800 text-white p-4 rounded-lg mb-6">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center text-2xl font-bold">
            M
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold">M_Saketh</h2>
            <p>Level:1</p>
          </div>
        </div>
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Edit Profile</button>
      </div>

      {/* Contest Stats Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Contest Stats</h2>
        <div className="flex justify-between items-center">
          <div>
            <p>Total tasks completed: <span className="font-bold">24</span></p>
          </div>
          <div>
            <Flame className="h-10 w-10 text-primary ms-3" />
            <span className="text-2xl font-semibold text-primary">Streak 10</span>
          </div>
        </div>
      </div>

      {/* Heatmap Section */}
      <div className="bg-white shadow-md rounded-lg p-10 mt-5">
  <h2 className="text-lg font-semibold mb-4">Yearly Activity Heatmap</h2>
  <div className="overflow-x-auto">
    <CalendarHeatmap
      startDate={new Date('2024-01-01')}
      endDate={new Date('2024-12-31')}
      values={heatmapData}
      classForValue={(value) => {
        if (!value) {
          return 'color-empty';
        }
        return `color-scale-${value.count}`;
      }}
      
      gutterSize={2} // Reduced spacing for better alignment
      horizontal={true} // Display months in a vertical series
    />
  </div>
  <div className="text-sm text-gray-500 mt-4">
    <p>Total active days: <span className="font-bold">13</span></p>
    <p>Max streak: <span className="font-bold">3</span></p>
  </div>
</div>
    </div>
  );
};

export default LeaderboardPage;
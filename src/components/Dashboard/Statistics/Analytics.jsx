import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line
} from 'recharts';

const Analytics = () => {
  const summary = {
    revenue: '₹2.51M',
    bookings: 373,
    decorators: 12,
    rating: 4.8,
    revenueGrowth: '+18%',
    bookingsGrowth: '+12%',
    decoratorsGrowth: '+2',
    ratingGrowth: '+0.2'
  };

  const barData = [
    { month: 'Jan', bookings: 45 },
    { month: 'Feb', bookings: 50 },
    { month: 'Mar', bookings: 60 },
    { month: 'Apr', bookings: 58 },
    { month: 'May', bookings: 60 },
    { month: 'Jun', bookings: 75 }
  ];

  const pieData = [
    { name: 'Wedding', value: 35 },
    { name: 'Home', value: 25 },
    { name: 'Office', value: 20 },
    { name: 'Events', value: 20 }
  ];

  const lineData = [
    { month: 'Jan', revenue: 300 },
    { month: 'Feb', revenue: 350 },
    { month: 'Mar', revenue: 400 },
    { month: 'Apr', revenue: 375 },
    { month: 'May', revenue: 425 },
    { month: 'Jun', revenue: 475 }
  ];

  const pieColors = ['#6366F1', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Our Analytics & Reports</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: summary.revenue, growth: summary.revenueGrowth },
          { label: 'Total Bookings', value: summary.bookings, growth: summary.bookingsGrowth },
          { label: 'Active Decorators', value: summary.decorators, growth: summary.decoratorsGrowth },
          { label: 'Avg. Rating', value: summary.rating, growth: summary.ratingGrowth }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500">{item.label}</div>
            <div className="text-xl font-semibold text-gray-800">{item.value}</div>
            <div className="text-green-500 text-sm">{item.growth}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Service Demand (Monthly Bookings)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#C9A227" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Bookings by Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
import {
  Users,
  Brain,
  Activity,
  TrendingUp,
  UserPlus,
  PlusCircle,
  BarChart3,
  ArrowUpRight,
  Clock,
  CheckCircle,
  MoreHorizontal,
} from "lucide-react";

function AdminHome() {
  const stats = [
    {
      title: "Total Users",
      value: "1,248",
      change: "+12.5%",
      description: "from last month",
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Predictions",
      value: "8,426",
      change: "+18.2%",
      description: "from last month",
      icon: Brain,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Active Users",
      value: "892",
      change: "+8.4%",
      description: "from last month",
      icon: Activity,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Success Rate",
      value: "94.8%",
      change: "+3.1%",
      description: "from last month",
      icon: TrendingUp,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  const recentUsers = [
    {
      name: "Rahul Patel",
      email: "rahul@example.com",
      status: "Active",
      date: "Today, 10:42 AM",
    },
    {
      name: "Priya Sharma",
      email: "priya@example.com",
      status: "Active",
      date: "Today, 09:25 AM",
    },
    {
      name: "Amit Kumar",
      email: "amit@example.com",
      status: "Inactive",
      date: "Yesterday, 06:18 PM",
    },
    {
      name: "Neha Shah",
      email: "neha@example.com",
      status: "Active",
      date: "Yesterday, 03:42 PM",
    },
  ];

  const recentPredictions = [
    {
      model: "House Price Prediction",
      user: "Rahul Patel",
      result: "₹48.5 Lakh",
      time: "5 min ago",
    },
    {
      model: "Placement Prediction",
      user: "Priya Sharma",
      result: "87.4%",
      time: "18 min ago",
    },
    {
      model: "Heart Disease Prediction",
      user: "Amit Kumar",
      result: "Low Risk",
      time: "32 min ago",
    },
    {
      model: "Stock Price Prediction",
      user: "Neha Shah",
      result: "₹1,245",
      time: "1 hour ago",
    },
  ];

  return (
    <main className="min-h-full bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* ================================
            PAGE HEADER
        ================================= */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Admin Dashboard
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Welcome back! Here's what's happening with PredictHub.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              <BarChart3 size={17} />
              Analytics
            </button>

            <button
              type="button"
              className="flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <UserPlus size={17} />
              Add User
            </button>
          </div>
        </div>

        {/* ================================
            STATISTICS
        ================================= */}
        <section>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {stat.title}
                      </p>

                      <h2 className="mt-2 text-2xl font-bold text-gray-900">
                        {stat.value}
                      </h2>
                    </div>

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}
                    >
                      <Icon size={22} />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="flex items-center text-xs font-semibold text-green-600">
                      <ArrowUpRight size={14} />
                      {stat.change}
                    </span>

                    <span className="text-xs text-gray-400">
                      {stat.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================
            QUICK ACTIONS
        ================================= */}
        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Quickly manage your PredictHub platform.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <button
              type="button"
              className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <UserPlus size={21} />
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Create User
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Add a new user
                </p>
              </div>
            </button>

            <button
              type="button"
              className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition group-hover:bg-purple-600 group-hover:text-white">
                <PlusCircle size={21} />
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Add Model
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Add ML/DL model
                </p>
              </div>
            </button>

            <button
              type="button"
              className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 transition group-hover:bg-green-600 group-hover:text-white">
                <BarChart3 size={21} />
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  View Analytics
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Check platform stats
                </p>
              </div>
            </button>

            <button
              type="button"
              className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition group-hover:bg-orange-600 group-hover:text-white">
                <Activity size={21} />
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  System Status
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Check system health
                </p>
              </div>
            </button>

          </div>
        </section>

        {/* ================================
            RECENT ACTIVITY
        ================================= */}
        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">

          {/* Recent Users */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h2 className="font-semibold text-gray-900">
                  Recent Users
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Latest registered users
                </p>
              </div>

              <button
                type="button"
                className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
              >
                View All
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {recentUsers.map((user) => (
                <div
                  key={user.email}
                  className="flex items-center justify-between px-5 py-4 transition hover:bg-gray-50"
                >
                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                      {user.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {user.name}
                      </p>

                      <p className="truncate text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="ml-3 hidden shrink-0 text-right sm:block">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.status}
                    </span>

                    <p className="mt-1 text-xs text-gray-400">
                      {user.date}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="ml-3 text-gray-400 transition hover:text-gray-600 sm:hidden"
                  >
                    <MoreHorizontal size={19} />
                  </button>

                </div>
              ))}
            </div>
          </div>

          {/* Recent Predictions */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h2 className="font-semibold text-gray-900">
                  Recent Predictions
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Latest prediction activity
                </p>
              </div>

              <button
                type="button"
                className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
              >
                View All
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {recentPredictions.map((prediction) => (
                <div
                  key={`${prediction.model}-${prediction.user}`}
                  className="flex items-center justify-between px-5 py-4 transition hover:bg-gray-50"
                >
                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                      <Brain size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {prediction.model}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {prediction.user}
                      </p>
                    </div>
                  </div>

                  <div className="ml-3 shrink-0 text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {prediction.result}
                    </p>

                    <p className="mt-1 flex items-center justify-end gap-1 text-xs text-gray-400">
                      <Clock size={12} />
                      {prediction.time}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ================================
            SYSTEM STATUS
        ================================= */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                <CheckCircle size={21} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  All Systems Operational
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  PredictHub services are running normally.
                </p>
              </div>

            </div>

            <span className="w-fit rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
              Operational
            </span>

          </div>
        </section>

      </div>
    </main>
  );
}

export default AdminHome;
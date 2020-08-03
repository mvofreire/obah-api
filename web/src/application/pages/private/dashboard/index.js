import DashboardPage from "./Dashboard";

export const DashboardConfig = {
  key:'admin-page-dashboard',
  auth: true,
  path: "/admin/dashboard",
  component: DashboardPage,
  menu: {
    icon: "AreaChartOutlined",
    label: "Dashboard",
  },
};

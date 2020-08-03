import ConfigPage from "./Configuration";

export const ConfigPageConfig = {
  key: "admin-config",
  auth: true,
  path: "/admin/configuration",
  component: ConfigPage,
  menu: {
    icon: "SettingFilled",
    label: "Configurações",
  },
};

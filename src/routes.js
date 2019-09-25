import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import UserProfileLite from "./views/UserProfileLite";
import Errors from "./views/Errors";
import Vaches from "./views/vachesView/vaches";
import Main from "./views/mainPage/main";
import regime from "./views/RegimeView/reigmeView";
import DAC from "./views/DacView/DacView";
import Statistique from "./views/StatistiqueView/StatistiqueView";
import User from "./views/UserView/UserView";
import Profile from "./views/ProfileView/ProfileView";
import Log from "./views/LogView/LogView";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/main" />
  },
  {
    path: "/Vaches",
    exact: true,
    layout: DefaultLayout,
    component: Vaches 
  },
  {
    path: "/main",
    exact: true,
    layout: DefaultLayout,
    component: Main 
  },
  {
    path: "/regime",
    exact: true,
    layout: DefaultLayout,
    component: regime 
  },
  {
    path: "/DAC",
    exact: true,
    layout: DefaultLayout,
    component: DAC 
  },
  {
    path: "/Profile",
    exact: true,
    layout: DefaultLayout,
    component: Profile 
  },
{
    path: "/User",
    exact: true,
    layout: DefaultLayout,
    component: User 
  },
  {
    path: "/Statistique",
    exact: true,
    layout: DefaultLayout,
    component: Statistique 
  },
 
  {
    path: "/Log",
    exact: true,
    layout: DefaultLayout,
    component: Log 
  },


  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },

  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },

];

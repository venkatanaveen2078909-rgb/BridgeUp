import { RouteObject } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ProfessionalMode from "./pages/ProfessionalMode";
import PersonalMode from "./pages/PersonalMode";
import CommunityMode from "./pages/CommunityMode";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import SkillSwap from "./pages/SkillSwap";
import MoodCheckIn from "./pages/MoodCheckIn";
import SupportRooms from "./pages/SupportRooms";
import LocalSkills from "./pages/LocalSkills";
import Settings from "./pages/Settings";

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/professional",
    Component: ProfessionalMode,
  },
  {
    path: "/personal",
    Component: PersonalMode,
  },
  {
    path: "/community",
    Component: CommunityMode,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/analytics",
    Component: Analytics,
  },
  {
    path: "/skill-swap",
    Component: SkillSwap,
  },
  {
    path: "/mood-check",
    Component: MoodCheckIn,
  },
  {
    path: "/support-rooms",
    Component: SupportRooms,
  },
  {
    path: "/local-skills",
    Component: LocalSkills,
  },
  {
    path: "/settings",
    Component: Settings,
  },
];

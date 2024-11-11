import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Registration from "./pages/Registration";
import AuthenticatedLayout from "./componets/AuthenticatedLayout";
import ProviderPage from "./pages/ProviderPage";
import ProviderDetails from "./pages/ProviderDetails";
import Userpage from "./pages/Userpage";
import UserDetails from "./pages/UserDetails";
import ServicePage from "./pages/ServicePage";
import Appointmentpage from "./pages/Appointmentpage";
import Reviewpage from "./pages/Reviewpage";
import LogPages from "./pages/LogPages";
import Settings from "./pages/Settings";

const App = () => {

  return (
    <BrowserRouter>
      <div className="flex">
        <Routes>
          <Route path="/login" element={<Registration />} />
          <Route element={<AuthenticatedLayout />}>
          <Route path="/register" element={<Registration isRegistration />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="admin/users" element={<Userpage />} />
            <Route path="admin/userdetail/:id" element={<UserDetails />} />

            <Route path="/admin/providers" element={<ProviderPage />} />
            <Route path="/admin/providers/:pid" element={<ProviderDetails />} />

            <Route path="/admin/services" element={<ServicePage />} />
            <Route path="/admin/bookings" element={<Appointmentpage />} />
            <Route path="/admin/reviews" element={<Reviewpage />} />
            <Route path="/admin/logs" element={<LogPages />} />
            <Route path="/admin/settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

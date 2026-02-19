import { Route, Routes } from "react-router-dom";

import { AppLayout } from "./layout";
import { HomeView } from "./views/Home";
import { PrivacyView, SupportView, TermsView } from "./views/Legal";

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomeView />} />
        <Route path="/privacy" element={<PrivacyView />} />
        <Route path="/terms" element={<TermsView />} />
        <Route path="/support" element={<SupportView />} />
      </Route>
    </Routes>
  );
};

export default App;

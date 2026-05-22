import { Navigate, Route, Routes } from "react-router-dom";

import { AppLayout } from "./layout";
import { HomeView } from "./views/Home";
import { PrivacyView, SupportView, TermsView } from "./views/Legal";

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomeView />} />
        <Route path="/privacidade" element={<PrivacyView />} />
        <Route path="/termos" element={<TermsView />} />
        <Route path="/suporte" element={<SupportView />} />

        <Route path="/en" element={<HomeView />} />
        <Route path="/en/privacy" element={<PrivacyView />} />
        <Route path="/en/terms" element={<TermsView />} />
        <Route path="/en/support" element={<SupportView />} />

        <Route path="/privacy" element={<Navigate to="/privacidade" replace />} />
        <Route path="/terms" element={<Navigate to="/termos" replace />} />
        <Route path="/support" element={<Navigate to="/suporte" replace />} />
      </Route>
    </Routes>
  );
};

export default App;

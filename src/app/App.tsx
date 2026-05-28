import { Navigate, Route, Routes } from "react-router-dom";

import { AppLayout } from "./layout";
import { ContactView } from "./views/Contact";
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
        <Route path="/contato" element={<ContactView />} />

        <Route path="/en" element={<HomeView />} />
        <Route path="/en/privacy" element={<PrivacyView />} />
        <Route path="/en/terms" element={<TermsView />} />
        <Route path="/en/support" element={<SupportView />} />
        <Route path="/en/get-in-touch" element={<ContactView />} />

        <Route path="/privacy" element={<Navigate to="/privacidade" replace />} />
        <Route path="/terms" element={<Navigate to="/termos" replace />} />
        <Route path="/support" element={<Navigate to="/suporte" replace />} />
        <Route path="/get-in-touch" element={<Navigate to="/en/get-in-touch" replace />} />
      </Route>
    </Routes>
  );
};

export default App;

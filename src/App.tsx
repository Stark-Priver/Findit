import { Route, Routes } from "react-router-dom";
import { StitchDesign } from "./screens/StitchDesign/StitchDesign";
import { Login } from "./screens/Auth/Login";
import { SignUp } from "./screens/Auth/SignUp";
import { FoundItemsList } from "./screens/FoundItems/FoundItemsList";
import { FoundItemDetail } from "./screens/FoundItems/FoundItemDetail";
import { ReportLostItem } from "./screens/LostItems/ReportLostItem";
import { LostItemDetail } from "./screens/LostItems/LostItemDetail";
import { ReportFoundItem } from "./screens/FoundItems/ReportFoundItem";
import { ClaimItem } from "./screens/FoundItems/ClaimItem";
import { Dashboard } from "./screens/Dashboard/Dashboard";
import { AdminDashboard } from "./screens/Admin/AdminDashboard";
import { Layout } from "./components/layout/Layout";
import { AuthProtected } from "./components/AuthProtected";
import { AdminProtected } from "./components/AdminProtected";
import About from "./screens/Static/About";
import Contact from "./screens/Static/Contact";
import TermsOfService from "./screens/Static/TermsOfService";
import PrivacyPolicy from "./screens/Static/PrivacyPolicy";

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<StitchDesign />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/found-items" element={<FoundItemsList />} />
        <Route path="/found-items/:id" element={<FoundItemDetail />} />
        <Route 
          path="/report-lost-item" 
          element={
            <AuthProtected>
              <ReportLostItem />
            </AuthProtected>
          } 
        />
        <Route path="/lost-items/:id" element={<LostItemDetail />} />
        <Route 
          path="/report-found-item" 
          element={
            <AuthProtected>
              <ReportFoundItem />
            </AuthProtected>
          } 
        />
        <Route 
          path="/claim-item/:id" 
          element={
            <AuthProtected>
              <ClaimItem />
            </AuthProtected>
          } 
        />
        <Route
          path="/dashboard"
          element={
            <AuthProtected>
              <Dashboard />
            </AuthProtected>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminProtected>
              <AdminDashboard />
            </AdminProtected>
          }
        />
      <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </Layout>
  );
};
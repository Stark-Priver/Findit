import { Route, Routes } from "react-router-dom";
import { StitchDesign } from "./screens/StitchDesign/StitchDesign";
import { Login } from "./screens/Auth/Login";
import { SignUp } from "./screens/Auth/SignUp";
import { FoundItemsList } from "./screens/FoundItems/FoundItemsList";
import { FoundItemDetail } from "./screens/FoundItems/FoundItemDetail";
import { ReportLostItem } from "./screens/LostItems/ReportLostItem";
import { Dashboard } from "./screens/Dashboard/Dashboard";
import { Layout } from "./components/layout/Layout";
import { AuthProtected } from "./components/AuthProtected";

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
        <Route
          path="/dashboard"
          element={
            <AuthProtected>
              <Dashboard />
            </AuthProtected>
          }
        />
      </Routes>
    </Layout>
  );
};
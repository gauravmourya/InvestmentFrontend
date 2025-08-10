import { Routes, Route, Navigate } from "react-router-dom";
import { Investors } from "../pages/investors/Investors";
import { Commitments } from "../pages/commitments/Commitments";

export function AllRoutes(){
    return <>
    <Routes>
      <Route path="/" element={<Navigate to="/investors" replace />} />
      <Route path="/investors" element={<Investors />} />
      <Route path="/investors/:investorId/commitments" element={<Commitments />} />
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
    </>
}
"use client"
import ProtectedPage from "@/components/ProtectedRoute";
import Dashboard from "@/layout/Dashboard";

function DashboardPage() {
  return (
    <ProtectedPage>
      <Dashboard />
    </ProtectedPage>
  )
}

export default DashboardPage
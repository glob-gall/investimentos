"use client"
import Dashboard from "@/layout/Dashboard";
import ProtectedPage from "@/layout/ProtectedPage";

function DashboardPage() {
  return (
    <ProtectedPage>
      <Dashboard />
    </ProtectedPage>
  )
}

export default DashboardPage
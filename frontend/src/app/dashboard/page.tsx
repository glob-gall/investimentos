"use client"
import ProtectedPage from "@/components/ProtectedRoute";

function DashboardPage() {
  return (
    <ProtectedPage>
      <p>Dashboard</p>
    </ProtectedPage>
  )
}

export default DashboardPage
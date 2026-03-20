import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* <Header /> */}

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

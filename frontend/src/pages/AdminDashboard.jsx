import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'

// Dummy Components for different admin sections
const DashboardHome = () => <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
const ManageUsers = () => <h2 className="text-2xl font-semibold">Manage Users</h2>
const ManageRestaurants = () => <h2 className="text-2xl font-semibold">Manage Restaurants</h2>
const Orders = () => <h2 className="text-2xl font-semibold">Orders</h2>
const Reports = () => <h2 className="text-2xl font-semibold">Reports</h2>

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Admin Dashboard
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  `block px-4 py-2 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                }
              >
                Dashboard Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `block px-4 py-2 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                }
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/restaurants"
                className={({ isActive }) =>
                  `block px-4 py-2 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                }
              >
                Manage Restaurants
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `block px-4 py-2 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                }
              >
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/reports"
                className={({ isActive }) =>
                  `block px-4 py-2 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                }
              >
                Reports
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Routes>
          <Route path="/admin" element={<DashboardHome />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/restaurants" element={<ManageRestaurants />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  )
}

export default AdminDashboard

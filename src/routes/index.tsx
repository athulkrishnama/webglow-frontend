import { createFileRoute, redirect } from '@tanstack/react-router'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { ROLES } from '../constants/roles.constant'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    // Redirect to login if user is not logged in OR is a provider
    if (!context.isLoggedin() || !context.checkRole(ROLES.USER)) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: Index,
})

export function Index() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to WebGlow!</h1>
      
      {isAuthenticated ? (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">User Details</h2>
          <div className="space-y-3 text-gray-600">
            <p><span className="font-medium text-gray-900">Name:</span> {user?.name}</p>
            <p><span className="font-medium text-gray-900">Email:</span> {user?.email}</p>
            <p><span className="font-medium text-gray-900">Role:</span> <span className="capitalize">{user?.role}</span></p>
            <p><span className="font-medium text-gray-900">ID:</span> {user?.id}</p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
          <p className="text-gray-600">You are currently not logged in.</p>
          <p className="text-sm text-gray-500 mt-2">Please log in to view your details.</p>
        </div>
      )}
    </div>
  )
}

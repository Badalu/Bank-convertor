'use client'

export function ManageSubscriptionButton() {
  const handleManage = () => {
    alert('To manage your subscription or cancel, please contact support at haribadal5@gmail.com')
  }

  return (
    <button
      onClick={handleManage}
      className="w-full text-center py-2 px-4 border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
    >
      Manage Subscription
    </button>
  )
}

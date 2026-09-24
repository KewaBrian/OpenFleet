import { CalendarClock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { formatDate, formatNumber } from '@/lib/formatters'
import { useMaintenanceUpcoming } from './hooks'

export function MaintenanceUpcomingList() {
  const { data, isLoading, isError, refetch } = useMaintenanceUpcoming()

  if (isLoading) return <p className="text-sm text-gray-500 dark:text-gray-400">Loading upcoming maintenance…</p>
  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
        Failed to load upcoming maintenance.{' '}
        <button type="button" onClick={() => void refetch()} className="underline">Try again</button>
      </div>
    )
  }

  if (!data?.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 py-16 text-center dark:border-gray-800">
        <CalendarClock className="h-10 w-10 text-gray-300 dark:text-gray-600" />
        <p className="mt-3 font-medium text-gray-900 dark:text-white">No upcoming service</p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">No scheduled maintenance is approaching its reminder window.</p>
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {data.map((schedule) => {
        const target = schedule.vehicleId ? `/vehicles/${schedule.vehicleId}` : schedule.assetId ? `/assets/${schedule.assetId}` : undefined
        return (
          <li key={schedule.id} className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <Link to={`/maintenance/schedules/${schedule.id}/edit`} className="font-medium text-brand-600 hover:underline dark:text-brand-400">{schedule.name}</Link>
                {target ? <Link to={target} className="mt-0.5 block text-sm text-gray-600 hover:underline dark:text-gray-400">{schedule.vehicleDescription ?? schedule.assetDescription}</Link> : null}
              </div>
              <Badge variant="info">Upcoming</Badge>
            </div>
            <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
              {schedule.nextDueDate && <span>Due {formatDate(schedule.nextDueDate)}</span>}
              {schedule.nextDueMileage != null && <span>At {formatNumber(schedule.nextDueMileage)} mi</span>}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

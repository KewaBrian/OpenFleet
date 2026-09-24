import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { MaintenanceUpcomingList } from './MaintenanceUpcomingList'

const useMaintenanceUpcoming = vi.hoisted(() => vi.fn())
vi.mock('./hooks', () => ({ useMaintenanceUpcoming }))

describe('MaintenanceUpcomingList', () => {
  it('renders upcoming vehicle service and its due date', () => {
    useMaintenanceUpcoming.mockReturnValue({
      data: [
        {
          id: 'schedule-1',
          name: 'Oil change',
          description: '',
          vehicleId: 'vehicle-1',
          vehicleDescription: '2022 Ford Transit',
          assetId: null,
          assetDescription: null,
          mileageInterval: 5000,
          dayInterval: 90,
          lastPerformedAt: '2026-06-26T00:00:00Z',
          lastPerformedMileage: 10000,
          isActive: true,
          isDue: false,
          nextDueDate: '2026-09-24T00:00:00Z',
          nextDueMileage: 15000,
          daysOverdue: null,
          milesOverdue: null,
          createdAt: '2026-01-01T00:00:00Z',
        },
      ],
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    })

    render(
      <MemoryRouter>
        <MaintenanceUpcomingList />
      </MemoryRouter>,
    )

    expect(screen.getByText('Oil change')).toBeInTheDocument()
    expect(screen.getByText('2022 Ford Transit')).toBeInTheDocument()
    expect(screen.getByText('Upcoming')).toBeInTheDocument()
    expect(screen.getByText(/Due/)).toBeInTheDocument()
    expect(screen.getByText(/15,000 mi/)).toBeInTheDocument()
  })
})

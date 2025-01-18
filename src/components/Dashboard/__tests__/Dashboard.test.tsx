import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { useTaskStore } from '../../../stores/taskStore'
import { mockTaskStoreDefault } from '../../../test-utils'
import Dashboard from '../Dashboard'

jest.mock('../../../stores/taskStore', () => ({
  useTaskStore: jest.fn()
}))

describe('Dashboard', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    (useTaskStore as unknown as jest.Mock).mockImplementation((selector) => {
      const state = mockTaskStoreDefault;
      return typeof selector === 'function' ? selector(state) : state;
    });
  });

  it('deve renderizar todos os componentes do dashboard', async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
      expect(screen.getByTestId('add-task-button')).toBeInTheDocument();
    });
  });
}); 
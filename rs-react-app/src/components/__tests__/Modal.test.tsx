
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import Modal from '../Modal'


vi.mock('react-dom', () => ({
    createPortal: (children: React.ReactNode) => children,
}))

describe('Modal', () => {
    beforeEach(() => {
        // Создаем корневой элемент для портала
        const portalRoot = document.createElement('div')
        portalRoot.setAttribute('id', 'root')
        document.body.appendChild(portalRoot)
    })

    afterEach(() => {
        const portalRoot = document.getElementById('root')
        if (portalRoot) {
            document.body.removeChild(portalRoot)
        }
    })

    it('renders modal with title and content', () => {
        const onClose = vi.fn()
        render(
            <Modal onClose={onClose} title="Test Modal">
                <div>Modal Content</div>
            </Modal>
        )

        expect(screen.getByText('Test Modal')).toBeInTheDocument()
        expect(screen.getByText('Modal Content')).toBeInTheDocument()
    })

    it('calls onClose when close button is clicked', () => {
        const onClose = vi.fn()
        render(
            <Modal onClose={onClose} title="Test Modal">
                <div>Modal Content</div>
            </Modal>
        )

        fireEvent.click(screen.getByLabelText('Закрыть модальное окно'))
        expect(onClose).toHaveBeenCalled()
    })

    it('calls onClose when Escape key is pressed', () => {
        const onClose = vi.fn()
        render(
            <Modal onClose={onClose} title="Test Modal">
                <div>Modal Content</div>
            </Modal>
        )

        fireEvent.keyDown(document, { key: 'Escape' })
        expect(onClose).toHaveBeenCalled()
    })
})
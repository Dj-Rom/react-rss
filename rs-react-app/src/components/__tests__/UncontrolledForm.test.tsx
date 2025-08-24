import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UncontrolledForm from '../forms/UncontrolledForm';

describe('UncontrolledForm', () => {
  const mockSubmit = vi.fn();

  beforeEach(() => {
    mockSubmit.mockReset();

    vi.stubGlobal(
      'FileReader',
      class implements FileReader {
        static readonly EMPTY = 0;
        static readonly LOADING = 1;
        static readonly DONE = 2;

        readonly EMPTY = 0;
        readonly LOADING = 1;
        readonly DONE = 2;

        readonly readyState = 2;
        readonly error: DOMException | null = null;
        result: string | ArrayBuffer | null = 'data:image/png;base64,mockdata';

        onabort:
          | ((this: FileReader, ev: ProgressEvent<FileReader>) => any)
          | null = null;
        onerror:
          | ((this: FileReader, ev: ProgressEvent<FileReader>) => any)
          | null = null;
        onload:
          | ((this: FileReader, ev: ProgressEvent<FileReader>) => any)
          | null = null;
        onloadend:
          | ((this: FileReader, ev: ProgressEvent<FileReader>) => any)
          | null = null;
        onloadstart:
          | ((this: FileReader, ev: ProgressEvent<FileReader>) => any)
          | null = null;
        onprogress:
          | ((this: FileReader, ev: ProgressEvent<FileReader>) => any)
          | null = null;

        // Required methods
        abort(): void {}
        readAsArrayBuffer(_: Blob): void {}
        readAsBinaryString(_: Blob): void {}
        readAsText(_: Blob, __?: string): void {}

        readAsDataURL(_: Blob): void {
          this.result = 'data:image/png;base64,mockdata';
          this.onload?.({
            target: this,
          } as unknown as ProgressEvent<FileReader>);
        }

        addEventListener(): void {}
        removeEventListener(): void {}
        dispatchEvent(): boolean {
          return true;
        }
      }
    );
  });

  it('renders all fields', () => {
    render(<UncontrolledForm onSubmit={mockSubmit} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Male' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Female' })).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText(/Photo/i)).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: /terms of use/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    render(<UncontrolledForm onSubmit={mockSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByTestId('name-error')).toHaveTextContent(/uppercase/);
      expect(screen.getByTestId('age-error')).toHaveTextContent(/positive/);
      expect(screen.getByTestId('gender-error')).toHaveTextContent(
        /Select gender/
      );
      expect(screen.getByTestId('country-error')).toHaveTextContent(
        /Select a country/
      );
      expect(screen.getByTestId('photo-error')).toHaveTextContent(
        /Unsupported file format/
      );
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('submits valid data', async () => {
    render(<UncontrolledForm onSubmit={mockSubmit} />);

    fireEvent.input(screen.getByLabelText('Name'), {
      target: { value: 'John' },
    });
    fireEvent.input(screen.getByLabelText('Age'), { target: { value: '30' } });
    fireEvent.input(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.input(screen.getByLabelText(/^Password$/i), {
      target: { value: 'Aa1!aaaa' },
    });
    fireEvent.input(screen.getByLabelText('Confirm Password'), {
      target: { value: 'Aa1!aaaa' },
    });
    fireEvent.click(screen.getByRole('radio', { name: 'Male' }));
    fireEvent.change(screen.getByLabelText('Country'), {
      target: { value: 'Germany' },
    });

    const validFile = new File(['dummy'], 'photo.png', { type: 'image/png' });
    fireEvent.change(screen.getByLabelText(/Photo/i), {
      target: { files: [validFile] },
    });

    fireEvent.click(screen.getByRole('checkbox', { name: /terms of use/i }));
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  });

  it('updates password strength bars', () => {
    const { container } = render(<UncontrolledForm onSubmit={mockSubmit} />);
    const passwordInput = screen.getByLabelText(/^Password$/i);

    fireEvent.input(passwordInput, { target: { value: 'Aa1!aaaa' } });

    const activeBars = container.querySelectorAll('.strength-bar.active');
    expect(activeBars.length).toBeGreaterThanOrEqual(4);
  });
});

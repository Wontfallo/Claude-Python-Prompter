import { Header } from '@/components/Header';
import { useStore } from '@/store/useStore';

export default function App() {
  const { trip } = useStore();

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      <Header />
      <main className="flex-1 p-4 overflow-hidden">
        <div className="h-full border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center bg-surface/50">
          <p className="text-muted text-sm">Timeline Canvas Placeholder (Next Step)</p>
        </div>
      </main>
    </div>
  );
}

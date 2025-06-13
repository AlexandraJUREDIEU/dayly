export function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg p-4 hidden md:block">
      <h2 className="text-lg font-bold mb-4">Dayly</h2>
      <nav className="flex flex-col gap-2">
        <a href="/" className="text-gray-700 hover:underline">Dashboard</a>
        <a href="#" className="text-gray-700 hover:underline">Paramètres</a>
      </nav>
    </aside>
  );
}
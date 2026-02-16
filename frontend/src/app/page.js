import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to TaskManager</h1>
      <p className="text-xl mb-8">Manage your tasks efficiently with our scalable platform.</p>
      <div className="space-x-4">
        <Link href="/login" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
          Login
        </Link>
        <Link href="/register" className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600">
          Get Started
        </Link>
      </div>
    </div>
  );
}

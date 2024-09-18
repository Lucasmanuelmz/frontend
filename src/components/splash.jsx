import './SplashScreen.css';

export default function SplashScreen() {
  return (
    <div className="flex h-screen items-center justify-center overflow-hidden bg-gray-200">
      <div className="relative flex space-x-4">
        <div className="animate-pulse-slow h-12 w-12 rounded-full bg-orange-500 delay-0"></div>
        <div className="animate-pulse-slow h-12 w-12 rounded-full bg-gray-500 delay-200"></div>
        <div className="animate-pulse-slow delay-400 h-12 w-12 rounded-full bg-red-500"></div>
      </div>
    </div>
  );
}

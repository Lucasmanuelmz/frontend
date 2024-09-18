export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200">
      <div className="text-center">
        <div className="animate-bounce text-3xl font-semibold text-gray-800">
          Carregando...
        </div>
      </div>
    </div>
  );
}

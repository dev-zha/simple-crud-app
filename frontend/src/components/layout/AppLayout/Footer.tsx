export default function Footer() {
  return (
    <footer className="bg-gray-100 rounded-lg shadow m-4">
      <div className="w-full mx-auto max-w-screen-lg p-4 flex items-center justify-center">
        <span className="text-sm text-gray-500 text-center">
          {'Design and build by '}
          <a href="https://github.com/dev-zha" target="blank" className="font-semibold hover:underline">Zaw Htet Aung</a>
        </span>
      </div>
    </footer>
  );
}

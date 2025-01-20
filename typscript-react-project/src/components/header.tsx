export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-6 md:px-4 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/svg/logo.svg"
              className="w-12 h-12 object-contain"
              alt=""
            />

            <h1 className="text-2xl font-bold text-blue-600">
              Image Identifier
            </h1>
          </div>

          <nav>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition duration-150 ease-in-out"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#how-it-works"
                  className="text-gray-600 hover:text-blue-600 transition duration-150 ease-in-out"
                >
                  How it works
                </a>
              </li>

              <li>
                <a
                  href="#features"
                  className="text-gray-600 hover:text-blue-600 transition duration-150 ease-in-out"
                >
                  Features
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

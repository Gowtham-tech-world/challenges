import React from 'react';

function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-4 w-full">
      <div className="flex justify-between items-center mx-auto max-w-full px-6">
        {/* Left: Brand or message */}
        <p className="text-sm">&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>

        {/* Right: Links (optional) */}
        <div className="mt-2 md:mt-0 flex gap-4">
          <a href="#" className="hover:underline text-sm">Privacy</a>
          <a href="#" className="hover:underline text-sm">Terms</a>
          <a href="#" className="hover:underline text-sm">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

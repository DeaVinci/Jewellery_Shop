import React from "react";

const Navbar = () => {
    return (
        <div className="drawer">
  <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
  <div className="drawer-content flex flex-col">
    {/* Navbar */}
    <div className="w-full navbar bg-base-300 flex md:justify-center">
      <div className="flex-none md:hidden">
        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div> 
      <div className="hidden md:block ">
        <ul className="menu menu-horizontal text-lg font-serif font-bold tracking-wider">
          {/* Navbar menu content here */}
          <li className="mx-3"><a className="btn bg-amber-300 hover:bg-amber-500 btn-xs sm:btn-sm lg:btn-md">Strona główna</a></li>
          <li className="mx-3"><a className="btn bg-amber-300 hover:bg-amber-500 btn-xs sm:btn-sm lg:btn-md">O nas</a></li>
          <li className="mx-3"><a className="btn bg-amber-300 hover:bg-amber-500 btn-xs sm:btn-sm lg:btn-md">Profil</a></li>
        </ul>
      </div>
    </div>
    {/* Page content here */}
  </div> 
  <div className="drawer-side z-10 md:hidden">
    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-base-200">
      {/* Sidebar content here */}
      <li className="mx-3 py-1"><a className="btn bg-amber-300 hover:bg-amber-500 btn-xs sm:btn-sm lg:btn-md">Strona główna</a></li>
      <li className="mx-3 py-1"><a className="btn bg-amber-300 hover:bg-amber-500 btn-xs sm:btn-sm lg:btn-md">O nas</a></li>
      <li className="mx-3 py-1"><a className="btn bg-amber-300 hover:bg-amber-500 btn-xs sm:btn-sm lg:btn-md">Profil</a></li>
    </ul>
  </div>
</div>
    )
}

export default Navbar
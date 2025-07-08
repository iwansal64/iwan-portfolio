import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return <>
  <button className="lg:hidden fixed top-4 left-4 text-3xl cursor-pointer z-101 w-[50px] h-[50px]" onClick={() => setIsOpen(!isOpen)}>
    <span className={`absolute left-1/2 -translate-x-1/2 top-1/2 h-1 w-full bg-white duration-500 ${isOpen ? "-translate-y-1/2 -rotate-225" : "-translate-y-[calc(50%_-_8px)]"}`}></span>
    <span className={`absolute left-1/2 -translate-x-1/2 top-1/2 h-1 w-full bg-white duration-500 ${isOpen ? "-translate-y-1/2 -rotate-135" : "-translate-y-[calc(50%_+_8px)]"}`}></span>
  </button>
  <div className={`lg:hidden w-full h-full flex flex-col justify-between fixed z-100 px-4 pb-8 pt-24 duration-1000 ${isOpen ? "bg-black" : "bg-transparent pointer-events-none"}`}>
    <div className={`flex flex-col text-4xl delay-500 duration-500 ${isOpen ? "" : "delay-0! -translate-x-[200%]"}`}>
      <a className="p-4 border-b-1 border-white" onClick={() => setIsOpen(false)} href="#hero">1. INTRO</a>
      <a className={`p-4 border-b-1 border-white -translate-x-48 duration-1000 ${isOpen ? "delay-400 translate-x-0!" : "delay-0"}`} onClick={() => setIsOpen(false)} href="#project">2. PROJECTS</a>
    </div>
    <div>
      <p className={`text-sm delay-500 duration-500 ${isOpen ? "" : "delay-0! -translate-x-[200%]"}`}>Developed by <span className="italic font-bold">Ridwan Bagoes Setiawan</span> with 💖</p>
    </div>
  </div>
  </>;
}
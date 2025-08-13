import { useProjectViewerHook } from "../../../hooks/useProjectViewer";


export default function ProjectViewerButton() {
  const { isOpen, setOpen } = useProjectViewerHook();

  const toggleProjectViewer = () => {
    setOpen(!isOpen);
    
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth"
    });

    console.log(window.scrollY);
  }

  return <>
    <button onClick={toggleProjectViewer} className="mt-6 text-center bg-transparent hover:bg-white active:scale-110 active:duration-100 duration-500 border border-white cursor-pointer px-6 py-4 font-bold text-white hover:text-black rounded-2xl">{isOpen ? "Deactivate" : "Activate"} Project Viewer</button>
  </>
}
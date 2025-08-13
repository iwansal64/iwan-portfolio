import { useProjectViewerHook } from "../../hooks/useProjectViewer";

export default function NavbarActiveTrigger() {
  const { isOpen } = useProjectViewerHook();
  
  return <span className={isOpen ? "navbar-not-active" : "navbar-active"}></span>
}
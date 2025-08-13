import { useProjectViewerHook } from "../../hooks/useProjectViewer";

export default function HeroActiveTrigger() {
  const { isOpen } = useProjectViewerHook();
  
  return <span className={isOpen ? "hero-not-active" : "hero-active"}></span>
}
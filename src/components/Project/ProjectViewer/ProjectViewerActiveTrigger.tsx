import { useProjectViewerHook } from "../../../hooks/useProjectViewer";

export default function ProjectViewerActiveTrigger() {
  const { isOpen } = useProjectViewerHook();
  
  return <span className={isOpen ? "project-viewer-active" : "project-viewer-not-active"}></span>
}
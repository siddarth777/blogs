const NotebookViewer: React.FC<{ filePath: string }> = ({ filePath }) => {

  // Convert relative path to absolute URL
  const localUrl = `${window.location.origin}${filePath}`;
  const viewerUrl = `https://nbviewer.org/url/${encodeURIComponent(localUrl)}`;
  console.log(localUrl);
  return (
    <iframe
      src={viewerUrl}
      className="w-full h-[90vh] border-0"
      title="Jupyter Notebook Viewer"
    />
  );
};

export default NotebookViewer;
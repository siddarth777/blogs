import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogViewerProps {
  /** Path to markdown file inside /public folder
   * Example: "blogs/ml/first.md"
   */
  path: string;
}

export default function BlogViewer({ path }: BlogViewerProps) {
  const [content, setContent] = useState<string>("Loading...");

  useEffect(() => {
    // Normalize path
    const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

    // Build final URL — works in dev and on GitHub Pages
    const fileUrl = import.meta.env.BASE_URL + normalizedPath;

    console.log("Fetching blog from:", fileUrl);

    fetch(fileUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.text();
      })
      .then(setContent)
      .catch((err) => {
        console.error(err);
        setContent(`# Error\nCould not fetch from: ${fileUrl}`);
      });
  }, [path]);

  return (
    <div className="prose mx-auto p-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

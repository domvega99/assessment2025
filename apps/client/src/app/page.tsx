'use client'
import Link from "next/link";
import { useState } from "react";


interface DownloadLink {
  link: string;
}

export default function Index() {
  const [downloadLink, setDownloadLink] = useState<string>("");

  const generateLink = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/download/generate");

      if (response.ok) {
        const data: DownloadLink = await response.json(); 
        setDownloadLink(data.link); 
      } else {
        console.error("Error generating the link:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching the link:", error);
    }
  };

  return (
    <div>
      <div className="wrapper">
        <div className="flex flex-col items-center mt-10 gap-20">
            <button className="bg-green-500 py-2 px-5 rounded text-white" onClick={generateLink}>Generate Link</button>

            {downloadLink && (
              <Link href={downloadLink} target="_blank">Download link</Link>
            )}
        </div>
      </div>
    </div>
  );
}

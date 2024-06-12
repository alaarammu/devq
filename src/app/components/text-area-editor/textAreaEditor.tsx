"use client";
import React, { useRef, useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Define the type for JoditEditor
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false }) as any;

interface RichTextEditorProps {
  content: string;
  setContent: (content: string) => void;
  placeholder?: string;
  readonly?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  setContent,
  placeholder = 'Start typing...',
  readonly = false,
}) => {
  const editor = useRef<any>(null);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const config = useMemo(() => ({
    readonly: readonly,
    placeholder: placeholder || 'Start typing...',
    removeButtons: ['about'],
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    toolbarAdaptive: false,
    buttons: [
      'bold', 'italic', 'underline', '|',
      'ul', 'ol', '|',
      'font', 'fontsize', 'brush', 'paragraph', '|',
      'image', 'table', 'link', '|',
      'align', 'undo', 'redo', '|',
      'hr', 'eraser', 'copyformat', '|',
      'fullsize', 'selectall', 'print', 'source'
    ],
    allowResizeX: false,
    allowResizeY: false,
    allowHTML: true,  // Allows HTML to be inserted
    cleanHTML: false  // Disables the cleaning of HTML when pasting or loading content
  }), [readonly, placeholder]);

  useEffect(() => {
    if (isClient) {
      const style = document.createElement('style');
      style.innerHTML = `
        .jodit-status-bar .jodit-status-bar__item:last-child {
          display: none;
        }
      `;
      document.head.appendChild(style);

      // Simulate loading time for the editor initialization
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Adjust the timeout as needed
    }
  }, [isClient]);

  if (!isClient) {
    return null; // Prevent rendering on the server
  }

  return (
    <div className='mt-3'>
      {loading ? (
        <div>Loading editor...</div> // Add your spinner or loading component here
      ) : (
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={(newContent: string) => setContent(newContent)}
          onChange={(newContent: string) => setContent(newContent)}
        />
      )}
    </div>
  );
};

export default RichTextEditor;

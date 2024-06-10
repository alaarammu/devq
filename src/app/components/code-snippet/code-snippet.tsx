import { useState } from 'react';
import { FaCopy, FaTrash } from 'react-icons/fa';

interface CodeSnippetProps {
  initialCode?: string; // Optional initial code
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ initialCode = '' }) => {
  const [code, setCode] = useState(initialCode);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => console.error('Failed to copy text: ', err));
  };

  const handleClear = () => {
    setCode('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  return (
    <div className="relative bg-gray-800 text-white font-mono rounded-lg shadow-lg">
      <div className="flex justify-between items-center bg-gray-900 px-4 py-2 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <FaTrash className="text-white" onClick={handleClear} />
        </div>
        <button
          className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 focus:outline-none"
          onClick={handleCopy}
        >
          {isCopied ? 'Copied' : 'Copy Code'}
        </button>
      </div>
      <textarea
        value={code}
        onChange={handleChange}
        className="w-full bg-transparent text-white font-mono outline-none resize-none p-4"
        rows={5}
        placeholder="Enter your code here..."
      />
    </div>
  );
};

export default CodeSnippet;

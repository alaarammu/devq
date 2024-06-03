"use client";

import { useState, useRef } from 'react';
import { FaBold, FaItalic, FaUnderline, FaCode, FaPaperclip, FaImage, FaRedo } from 'react-icons/fa';
import Select, { MultiValue } from 'react-select';
import makeAnimated from 'react-select/animated';

type OptionType = {
  value: string;
  label: string;
};

const options: OptionType[] = [
  { value: 'Golang', label: 'Golang' },
  { value: 'Java', label: 'Java' },
  { value: 'CSS', label: 'CSS' },
  { value: 'Tailwind', label: 'Tailwind' },
  { value: 'Python', label: 'Python' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'Node.js', label: 'Node' },
  { value: 'Nest.js', label: 'Nest js' },
  { value: 'NEXT.js', label: 'NEXT.js' },
  { value: 'Vue', label: 'Vue' },
  { value: 'Angular', label: 'Angular' },
  { value: 'Express.js', label: 'Express.js' },
  { value: 'Wordpress', label: 'Wordpress' },
  { value: 'React', label: 'React' },

];

const animatedComponents = makeAnimated();

export default function AskQuestion() {
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<MultiValue<OptionType>>([]);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
      setDescription('');
    }
  };

  const handleTagsChange = (selectedOptions: MultiValue<OptionType>) => {
    if (selectedOptions.length <= 3) {
      setSelectedTags(selectedOptions);
    }
  };

  const executeCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
  };

  return (
    <div className="mt-9 ml-11 mr-11">
      <p className="text-2xl font-semibold">
        Ask a Question
      </p>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Question Title</h2>
        <input 
          type="text" 
          placeholder="Title" 
          className="mt-2 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Describe your Issue</h2>
        <div className="mt-2 p-2 border border-gray-300 rounded-md w-full">
          <div className="flex justify-between mb-2">
            <div className="flex space-x-3">
              <button className="p-2 hover:bg-gray-200 rounded" onClick={() => executeCommand('bold')}>
                <FaBold />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded" onClick={() => executeCommand('italic')}>
                <FaItalic />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded" onClick={() => executeCommand('underline')}>
                <FaUnderline />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded" onClick={() => executeCommand('insertHTML', '<pre><code></code></pre>')}>
                <FaCode />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded">
                <FaPaperclip />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded">
                <FaImage />
              </button>
            </div>
            <button className="p-2 hover:bg-gray-200 rounded" onClick={handleReset}>
              <FaRedo />
            </button>
          </div>
          <div
            contentEditable
            ref={editorRef}
            className="w-full p-2 border border-gray-300 rounded-md h-48"
            onInput={(e) => setDescription(e.currentTarget.innerHTML)}
          ></div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Tags</h2>
        <Select
          isMulti
          components={animatedComponents}
          value={selectedTags}
          onChange={handleTagsChange}
          options={options}
          className="mt-2"
          placeholder="Select up to 3 tags..."
        />
      </div>
      <div className="mt-8 flex justify-center">
        <button
          className="bg-red-400 text-white py-2 px-4 rounded hover:bg-red-300"
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
}
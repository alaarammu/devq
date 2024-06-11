"use client";
import AnswerQuestion from "@/app/components/answer/answer";
import { useState } from "react";

export default function QuestionAnswer() {
  // Example question title
  const questionTitle = "How do I reverse a linked list to change the order of its elements?";

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const exampleCode = `function reverseLinkedList(head) {
  let prev = null;
  let current = head;
  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`;

    navigator.clipboard.writeText(exampleCode)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => console.error('Failed to copy text: ', err));
  };

  return (
    <div className="mt-9 mb-9 ml-11 mr-11 ">
      <h1 className="text-2xl text-blue-950">
        {/* Render the question title */}
        {questionTitle}
      </h1>
      <h2 className="text-sm mt-4 text-blue-950">
        Posted {/* How long ago */}
      </h2>
      <h2 className="mt-9 text-blue-950">
        I am working on vue element-plus upload component to upload the image to the express server.

        Here is the client side.
      </h2>

      <div className="mt-9 relative bg-gray-800 text-white font-mono p-4 rounded-lg shadow-lg">
        <button
          className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 focus:outline-none"
          onClick={handleCopy}
        >
          {isCopied ? 'Copied' : 'Copy Code'}
        </button>
        <pre className="whitespace-pre-wrap">
          <code>
            {`function reverseLinkedList(head) {
  let prev = null;
  let current = head;
  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`}
          </code>
        </pre>
      </div>
      <div className="mt-9">
        <AnswerQuestion />
      </div>
    </div>
  );
}

"use client";
import AnswerQuestion from "@/app/components/answer/answer";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useAuthStore from "../../../../services/utils/authStore";
import { getQuestionById } from "../../../../services/questionServices/questionService";
import moment from 'moment';
import RichTextEditor from '@/app/components/text-area-editor/textAreaEditor';
import { createAnswer } from "../../../../services/questionServices/questionService";

export default function QuestionAnswer() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [isCopied, setIsCopied] = useState(false);
  const [questionDetails, setQuestionDetails] = useState<any>(null);
  const [content, setContent] = useState<string>('');
  const [placeholder, setPlaceholder] = useState<string>('Start typing...');
  const [readonly, setReadonly] = useState<boolean>(false);

  const handleCopy = () => {
    if (questionDetails) {
      const plainText = questionDetails.description.replace(/<[^>]*>/g, '');
      navigator.clipboard.writeText(plainText)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch((err) => console.error('Failed to copy text: ', err));
    }
  };

  useEffect(() => {
    if (id) {
      getCompanyQuestion();
    }
  }, [id]);

  const getCompanyQuestion = async () => {
    try {
      const companyId = useAuthStore.getState().user.company?.id;
      const result = await getQuestionById(id);
      setQuestionDetails(result.data);
      console.log("data", result.data);
    } catch (error) {
      console.error("Error fetching question details: ", error);
    }
  };

  const renderCode = (code: any) => {
    return (
      <pre className="whitespace-pre-wrap">
        <code>{code}</code>
      </pre>
    );
  };


  const submitHandler = async () => {
    let userId = useAuthStore.getState().user.id;
    let questionId = id;

    let data: any = {
      user_id: userId,
      question_id: questionId,
      answer_text: content
    }
    let response = await createAnswer(data);
    console.log("data, ", response)
  };

  return (
    <div className="mt-9 mb-9 ml-11 mr-11">
      <h1 className="text-2xl text-blue-950">
        {questionDetails?.title || 'Loading...'}
      </h1>
      <h2 className="text-sm mt-4 text-blue-950">
        {questionDetails && `Posted ${moment(questionDetails.createdAt).format('MMMM DD, YYYY')}`}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: questionDetails?.description || '' }} />
      <div className="mt-9 relative bg-gray-800 text-white font-mono p-4 rounded-lg shadow-lg">
        <button
          className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 focus:outline-none"
          onClick={handleCopy}
        >
          {isCopied ? 'Copied' : 'Copy Code'}
        </button>
        <code>{questionDetails?.description}</code>
      </div>
      {questionDetails?.answers.length > 0 &&
        <div className="mt-4 ml-1">
          <p className="text-xl font-semibold">{questionDetails?.answers.length} Answers </p>
          {questionDetails.answers.map((answer: any, index: number) => (
            <>
              <div className="border border-blue-500 border-3 px-4 py-4 rounded-md mt-2 mb-2">
                <div dangerouslySetInnerHTML={{ __html: answer.answer_text || '' }} />
                <div className="flex justify-end">
                  <p className="text-md font-bold">Answered by <span className="text-blue-500">{answer.user.name}</span></p>
                </div>
              </div>

            </>
          ))}
        </div>
      }
      <div className="mt-9">
        <h2 className="text-xl font-semibold">Type your answer below</h2>
        <RichTextEditor
          content={content}
          setContent={setContent}
          placeholder={placeholder}
          readonly={readonly}

        />
      </div>

      <div className="flex pt-7 justify-center mt-auto mb-7">
        <button className="bg-red-400 text-white py-2 px-4 rounded hover:bg-red-300"
          onClick={submitHandler}>
          Upload
        </button>
      </div>
    </div>
  );
}

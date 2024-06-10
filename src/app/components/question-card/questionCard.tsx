
export default function QuestionCard() {
    return (
        <div className="w-full max-w-full p-4 bg-white border border-gray-200 rounded-lg shadow-md">
            <div className="mb-2 text-lg font-medium text-gray-900">
                How do I reverse a linked list to change the order of its elements?
            </div>
            <div className="flex items-center mb-4">
                <span className="px-2 py-1 mr-2 text-xs font-semibold text-blue-800 bg-blue-100 rounded">Python</span>
                <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded">Linked list</span>
            </div>
            <div className="flex justify-between items-center text-gray-500">
                <div className="flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 15l-5.5-5.5m11 0L10 15m-5.5 0L10 15m0 0l5.5-5.5m-5.5 5.5L10 5"></path>
                    </svg>
                    21
                </div>
                <div className="flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10.8c0-1.4 0-2.1.3-2.6.3-.5.7-.9 1.2-1.2C4 6.8 4.7 6.8 6 6.8h8c1.3 0 2 0 2.5.2.5.3.9.7 1.2 1.2.3.5.3 1.2.3 2.6s0 2.1-.3 2.6c-.3.5-.7.9-1.2 1.2-.5.2-1.2.2-2.5.2H6c-1.3 0-2 0-2.5-.2-.5-.3-.9-.7-1.2-1.2-.3-.5-.3-1.2-.3-2.6z"></path>
                    </svg>
                    2
                </div>
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                    <span className="text-sm font-medium text-gray-900">Damon Salvatore</span>
                </div>
            </div>
        </div>
    );
}

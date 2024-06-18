// "use client";
// import { useState, useEffect } from "react";
// import QuestionPosted from "../components/activity-cards/question-posted";
// import NewMember from "../components/activity-cards/new-member";
// import MemberQuestion from "../components/activity-cards/member-question";
// import MemberLike from "../components/activity-cards/member-like";
// import UserUpdates from "../components/activity-cards/user-updates";
// import useAuthStore from '../../../services/utils/authStore';
// import { getAllActivitiesByCompanyId, getAllPrivateActivitiesByUserId } from "../../../services/activityServices/activityService";

// export default function Activity() {

//   const [activeButton, setActiveButton] = useState('new');
//   const [publicActionDetails, setPublicActionDetails] = useState<any>([]);
//   const [privateActionDetails, setPrivateActionDetails] = useState<any>([]);

//   const handleButtonClick = (button: string) => { // Specify the type of 'button' as string
//     setActiveButton(button);
//   };

//   const getButtonClasses = (button: string) => (
//     `border border-indigo-400 font-semibold py-3 px-3 
//     ${activeButton === button ? 'bg-indigo-400 text-white' : 'bg-white text-indigo-400 hover:bg-indigo-400 hover:text-white focus:bg-indigo-400 focus:text-white'}
//     flex-shrink-0 rounded-md`
//   );
//   useEffect(() => {
//     fetchActivities();
//   }, []);

//   const fetchActivities = async () => {
//     const companyId = useAuthStore.getState().user?.company?.id;
//     const userId = useAuthStore.getState().user?.id;

//     if (companyId && userId) {
//       try {
//         const publicResult = await getAllActivitiesByCompanyId(companyId);
//         const sortedPublicActivities = publicResult.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//         setPublicActionDetails(sortedPublicActivities);

//         const privateResult = await getAllPrivateActivitiesByUserId(userId);
//         const sortedPrivateActivities = privateResult.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//         setPrivateActionDetails(sortedPrivateActivities);

//       } catch (error) {
//         console.error('Error fetching activities:', error);
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="mt-9 px-3 ml-9 mr-9">
//         <div className="text-2xl font-semibold mb-3 ">
//           Your Activity
//         </div>
//         <div className="flex justify-between items-center pt-5">
//           <div className="bg-white p-3 flex space-x-3 border border-indigo-400 rounded-md ">
//             <button onClick={() => handleButtonClick('new')} className={getButtonClasses('new')}>
//               New
//             </button>

//             <button onClick={() => handleButtonClick('today')} className={getButtonClasses('today')}>
//               All
//             </button>

//             <button onClick={() => handleButtonClick('thisWeek')} className={getButtonClasses('thisWeek')}>
//               My Questions
//             </button>

//           </div>
//         </div>
//         <div className="mt-7 space-y-5">
//           <>
//             {publicActionDetails.map((publicDetails: any, index: number) => (
//               (publicDetails.activityType == 0 ?
//                 <QuestionPosted
//                   key={index}
//                   notificationText={publicDetails.notificationText}
//                   userData={publicDetails.user}
//                   question={publicDetails.question}
//                   createdAt={publicDetails.createdAt}
//                 />
//                 :
//                 <NewMember
//                   userName={publicDetails.user.name}
//                   createdAt={publicDetails.createdAt}
//                 />)
//             ))}
//             {privateActionDetails.map((privateDetails: any, index: number) => (
//               (privateDetails.activityType == 0 ?
//                 <MemberQuestion
//                   performedBy={privateDetails.performedBy}
//                   userData={privateDetails.user}
//                   question={privateDetails.question}
//                   createdAt={privateDetails.createdAt}
//                 />
//                 :
//                 <MemberLike 
//                 performedBy={privateDetails.performedBy}
//                 userData={privateDetails.user}
//                 question={privateDetails.question}
//                 createdAt={privateDetails.createdAt}
//                 />)
//             ))}
//           </>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client";
import { useState, useEffect } from "react";
import QuestionPosted from "../components/activity-cards/question-posted";
import NewMember from "../components/activity-cards/new-member";
import MemberQuestion from "../components/activity-cards/member-question";
import MemberLike from "../components/activity-cards/member-like";
import useAuthStore from '../../../services/utils/authStore';
import { getAllActivitiesByCompanyId, getAllPrivateActivitiesByUserId } from "../../../services/activityServices/activityService";

export default function Activity() {
  const [activeButton, setActiveButton] = useState('new');
  const [publicActionDetails, setPublicActionDetails] = useState<any>([]);
  const [privateActionDetails, setPrivateActionDetails] = useState<any>([]);
  const [displayedPublicActivities, setDisplayedPublicActivities] = useState<any>([]);
  const [displayedPrivateActivities, setDisplayedPrivateActivities] = useState<any>([]);

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
    if (button === 'new') {
      setDisplayedPublicActivities(publicActionDetails.slice(0, 3));
      setDisplayedPrivateActivities(privateActionDetails.slice(0, 3));
    } else if (button === 'all') {
      setDisplayedPublicActivities(publicActionDetails);
      setDisplayedPrivateActivities(privateActionDetails);
    }
  };

  const getButtonClasses = (button: string) => (
    `border border-indigo-400 font-semibold py-3 px-3 
    ${activeButton === button ? 'bg-indigo-400 text-white' : 'bg-white text-indigo-400 hover:bg-indigo-400 hover:text-white focus:bg-indigo-400 focus:text-white'}
    flex-shrink-0 rounded-md`
  );

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const companyId = useAuthStore.getState().user?.company?.id;
    const userId = useAuthStore.getState().user?.id;

    if (companyId && userId) {
      try {
        const publicResult = await getAllActivitiesByCompanyId(companyId);
        const sortedPublicActivities = publicResult.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setPublicActionDetails(sortedPublicActivities);
        setDisplayedPublicActivities(sortedPublicActivities.slice(0, 5));

        const privateResult = await getAllPrivateActivitiesByUserId(userId);
        const sortedPrivateActivities = privateResult.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setPrivateActionDetails(sortedPrivateActivities);
        setDisplayedPrivateActivities(sortedPrivateActivities.slice(0, 5));
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    }
  };

  return (
    <div>
      <div className="mt-9 px-3 ml-9 mr-9">
        <div className="text-2xl font-semibold mb-3">
          Your Activity
        </div>
        <div className="flex justify-between items-center pt-5">
          <div className="bg-white p-3 flex space-x-3 border border-indigo-400 rounded-md">
            <button onClick={() => handleButtonClick('new')} className={getButtonClasses('new')}>
              New
            </button>

            <button onClick={() => handleButtonClick('all')} className={getButtonClasses('all')}>
              All
            </button>

            <button onClick={() => handleButtonClick('thisWeek')} className={getButtonClasses('thisWeek')}>
              My Questions
            </button>
          </div>
        </div>
        <div className="mt-7 space-y-5">
          <>
            {displayedPublicActivities.map((publicDetails: any, index: number) => (
              publicDetails.activityType == 0 ? (
                <QuestionPosted
                  key={index}
                  notificationText={publicDetails.notificationText}
                  userData={publicDetails.user}
                  question={publicDetails.question}
                  createdAt={publicDetails.createdAt}
                />
              ) : (
                <NewMember
                  key={index}
                  userName={publicDetails.user.name}
                  createdAt={publicDetails.createdAt}
                />
              )
            ))}
            {displayedPrivateActivities.map((privateDetails: any, index: number) => (
              privateDetails.activityType == 0 ? (
                <MemberQuestion
                  key={index}
                  performedBy={privateDetails.performedBy}
                  userData={privateDetails.user}
                  question={privateDetails.question}
                  createdAt={privateDetails.createdAt}
                />
              ) : (
                <MemberLike
                  key={index}
                  performedBy={privateDetails.performedBy}
                  userData={privateDetails.user}
                  question={privateDetails.question}
                  createdAt={privateDetails.createdAt}
                />
              )
            ))}
          </>
        </div>
      </div>
    </div>
  );
}

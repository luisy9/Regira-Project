import { useEffect, useState } from 'react'

export const useCommentsTest = () => {

  const [commentTask, setCommentTask] = useState([]);

  // const commentsText = async (comment) => {
  //   console.log('hola'+comment)
  // };

  useEffect(() => {
    console.log(commentTask)
  },[commentTask])

  return {
    commentTask,
    setCommentTask
  };
};


export default useCommentsTest;
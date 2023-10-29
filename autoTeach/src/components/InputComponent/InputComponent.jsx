import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

const InputComponent = ({ selectedProblem }) => {

  const editorRef = useRef(null);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoadingFeedback] = useState(true);

  useEffect(() => {
    setFeedback("");
    setIsLoadingFeedback(false);
  }, [selectedProblem])

  const submit = () => {
    setIsLoadingFeedback(true)
    if (editorRef.current) {
      let student_ans = editorRef.current.getContent();
      axios.post("http://127.0.0.1:8000/get_feedback_and_grade", {
        "model": "gpt",
        "question": selectedProblem.title + selectedProblem.subtitle,
        "rubric": selectedProblem.criteria,
        "correct_answer": selectedProblem.correctAnswer,
        "student_answer": student_ans
      }).then((response) => {
        // console.log(response.data.feedback_and_grade)
        setFeedback(response.data.feedback_and_grade)
        setIsLoadingFeedback(false)
      })
    }
  };

  return (
    <div className="my-10">
      {
        (isLoading || feedback) && 
          <div className="my-3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                AI Evaluation
            </h3>
            {!isLoading && feedback ? (
                <div className="">
                    {feedback}
                </div>
            ) : (
                <div className="">
                    loading...
                </div>
            )}
        </div>
      }
      <Editor
        apiKey='qx5ako3uyvbmcb28z12b5iq42j7c9wlixw3zlp8ymp4ll6ji'
        onInit={(evt, editor) => editorRef.current = editor}
        init={{
          plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
        }}
        initialValue="Show your work here..."
      />
      <button onClick={submit} type="button" className="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
    </div>
  )
}

export default InputComponent

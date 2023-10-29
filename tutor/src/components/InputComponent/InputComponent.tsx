import { Editor } from "@tinymce/tinymce-react"
import { useRef } from 'react';

const InputComponent = () => {

    const handleInit = (evt: any, editor: { getContent: (arg0: { format: string; }) => { (): any; new(): any; length: any; }; }) => {
        console.log(editor.getContent({ format: 'text' }).length);
    };

  return (
    <form className="my-10">
        {/* <Editor
          apiKey='qx5ako3uyvbmcb28z12b5iq42j7c9wlixw3zlp8ymp4ll6ji'
          onInit={handleInit}
          init={{
            plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
          }}
          initialValue="Show your work"
        /> */}
        <button type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
            Submit
        </button>
    </form>
  )
}

export default InputComponent

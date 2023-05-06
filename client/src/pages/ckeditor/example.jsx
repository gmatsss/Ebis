// App.jsx / App.tsx

import React, { Component } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";

// NOTE: Use the editor from source (not a build)!
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";

import { Essentials } from "@ckeditor/ckeditor5-essentials";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
} from "@ckeditor/ckeditor5-basic-styles";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import SourceEditing from "@ckeditor/ckeditor5-source-editing/src/sourceediting";

import Font from "@ckeditor/ckeditor5-font/src/font";
import List from "@ckeditor/ckeditor5-list/src/list";
import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import WordCount from "@ckeditor/ckeditor5-word-count/src/wordcount";
import SpecialCharacters from "@ckeditor/ckeditor5-special-characters/src/specialcharacters";
import SpecialCharactersEssentials from "@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials";
import HorizontalLine from "@ckeditor/ckeditor5-horizontal-line/src/horizontalline";
import ImageInsert from "@ckeditor/ckeditor5-image/src/imageinsert";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import LinkImage from "@ckeditor/ckeditor5-link/src/linkimage";

// import Table from "@ckeditor/ckeditor5-table/src/table";
// import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";

const editorConfiguration = {
  plugins: [
    Essentials,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    ImageInsert,
    Subscript,
    Superscript,
    Paragraph,
    Heading,
    SourceEditing,
    Font,
    List,
    Highlight,
    BlockQuote,
    WordCount,
    SpecialCharacters,
    SpecialCharactersEssentials,
    HorizontalLine,
    Image,
    ImageToolbar,
    ImageCaption,
    ImageStyle,
    ImageResize,
    LinkImage,
    // Table,
    // TableToolbar,
  ],
  toolbar: [
    "sourceEditing",
    "undo",
    "redo",
    "|",
    "heading",
    "|",

    "-", // break point
    "bold",
    "italic",
    "strikethrough",
    "subscript",
    "superscript",
    "specialCharacters",
    "|",

    "blockQuote",
    "highlight",
    "|",
    "fontSize",
    "fontFamily",
    "fontColor",
    "fontBackgroundColor",
    "|",
    "bulletedList",
    "numberedList",
    "horizontalLine",
    "outdent",
    "indent",
    "|",
    "imageStyle:block",
    "imageStyle:side",
    "|",
    "toggleImageCaption",
    "imageTextAlternative",
    "|",
    "linkImage",
    "insertImage",
  ],
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Using CKEditor 5 from source in React</h2>
        <CKEditor
          editor={ClassicEditor}
          config={editorConfiguration}
          data="<p>Hello from CKEditor 5!</p>"
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
    );
  }
}

export default App;

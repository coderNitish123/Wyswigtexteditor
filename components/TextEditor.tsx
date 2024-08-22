"use client";

import React, { useState } from "react";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Editor as DraftEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Toolbar from "./Toolbar"; // Import the Toolbar component

type Props = {
  onChange: (content: string) => void;
  content: string;
};

const DraftEditorComponent = ({ onChange, content }: Props) => {
  const [editorState, setEditorState] = useState<EditorState>(() =>
    content
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
      : EditorState.createEmpty()
  );

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    const currentContent = state.getCurrentContent();
    const rawContent = convertToRaw(currentContent);
    onChange(JSON.stringify(rawContent));
  };

  return (
    <div className="w-full px-4">
      <Toolbar editorState={editorState} setEditorState={setEditorState} />{" "}
      {/* Include Toolbar */}
      <DraftEditor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbarClassName="toolbarClassName"
        editorClassName="editorClassName"
      />
    </div>
  );
};

export default DraftEditorComponent;

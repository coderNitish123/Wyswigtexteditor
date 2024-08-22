"use client";

import React, { useState } from "react";
import { EditorState, RichUtils, ContentState } from "draft-js";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Heading2,
  Quote,
  Code,
  Link,
  Image,
  Video,
  PlusCircle,
  Font,
  TextColor,
  Highlight,
  CodeSnippet,
} from "lucide-react";

// Toolbar configuration (as provided)
const toolbar = {
  options: [
    "inline",
    "blockType",
    "fontSize",
    "fontFamily",
    "list",
    "textAlign",
    "colorPicker",
    "link",
    "embedded",
    "emoji",
    "image",
    "remove",
    "history",
  ],
  inline: {
    inDropdown: false,
    options: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "monospace",
      "superscript",
      "subscript",
    ],
  },
  blockType: {
    inDropdown: true,
    options: ["Normal", "H1", "H2", "H3", "H4", "Blockquote", "Code"],
  },
  fontSize: {
    options: [8, 9, 10, 12, 14, 16, 18, 24, 30, 36, 48, 60],
  },
  fontFamily: {
    options: [
      "Arial",
      "Georgia",
      "Impact",
      "Tahoma",
      "Times New Roman",
      "Verdana",
    ],
  },
  list: {
    inDropdown: false,
    options: ["unordered", "ordered", "indent", "outdent"],
  },
  textAlign: {
    inDropdown: false,
    options: ["left", "center", "right", "justify"],
  },
  colorPicker: {
    colors: [
      "rgb(97,189,109)",
      "rgb(26,188,156)",
      "rgb(84,172,210)",
      "rgb(44,130,201)",
      "rgb(147,101,184)",
      "rgb(204,204,204)",
      "rgb(65,168,95)",
      "rgb(0,168,133)",
      "rgb(61,142,185)",
      "rgb(41,105,176)",
      "rgb(85,57,130)",
      "rgb(40,50,78)",
      "rgb(0,0,0)",
      "rgb(247,218,100)",
      "rgb(251,160,38)",
      "rgb(235,107,86)",
      "rgb(226,80,65)",
      "rgb(163,143,132)",
      "rgb(239,239,239)",
      "rgb(255,255,255)",
      "rgb(250,197,28)",
      "rgb(243,121,52)",
      "rgb(209,72,65)",
      "rgb(184,49,47)",
      "rgb(124,112,107)",
      "rgb(209,213,216)",
    ],
  },
  link: {
    options: ["link", "unlink"],
    defaultTargetOption: "_self",
  },
  embedded: {
    defaultSize: { height: "auto", width: "auto" },
  },
  image: {
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    previewImage: true,
    inputAccept: "image/*",
  },
};

type Props = {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
};

const Toolbar = ({ editorState, setEditorState }: Props) => {
  const [fontType, setFontType] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("#000000");
  const [highlightColor, setHighlightColor] = useState<string>("#FFFF00");

  // Handlers for text formatting, block styles, and custom actions
  const handleToggle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const handleBlockToggle = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const handleAddContent = () => {
    const currentContent = editorState.getCurrentContent();
    const newContentState = ContentState.createFromText("Your Text Here");
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "insert-characters"
    );
    setEditorState(newEditorState);
  };

  const handleAddImage = () => {
    alert("Image upload functionality not implemented");
  };

  const handleAddVideo = () => {
    alert("Video embed functionality not implemented");
  };

  const handleAddTable = () => {
    alert("Table insert functionality not implemented");
  };

  const handleAddLink = () => {
    alert("Link insertion functionality not implemented");
  };

  const handleFontChange = (font: string) => {
    setFontType(font);
  };

  const handleTextColorChange = (color: string) => {
    setTextColor(color);
  };

  const handleHighlightChange = (color: string) => {
    setHighlightColor(color);
  };

  return (
    <div className="px-4 py-3 rounded-tl-md rounded-tr-md flex flex-col gap-2 w-full border border-gray-300 bg-white shadow-md">
      <div className="flex justify-start items-center gap-5 flex-wrap">
        {/* Inline Styles */}
        <button
          onClick={() => handleToggle("BOLD")}
          className={`p-2 rounded-lg ${
            editorState.getCurrentInlineStyle().has("BOLD")
              ? "bg-sky-700 text-white"
              : "text-sky-400"
          }`}
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleToggle("ITALIC")}
          className={`p-2 rounded-lg ${
            editorState.getCurrentInlineStyle().has("ITALIC")
              ? "bg-sky-700 text-white"
              : "text-sky-400"
          }`}
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleToggle("UNDERLINE")}
          className={`p-2 rounded-lg ${
            editorState.getCurrentInlineStyle().has("UNDERLINE")
              ? "bg-sky-700 text-white"
              : "text-sky-400"
          }`}
        >
          <Underline className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleToggle("STRIKETHROUGH")}
          className={`p-2 rounded-lg ${
            editorState.getCurrentInlineStyle().has("STRIKETHROUGH")
              ? "bg-sky-700 text-white"
              : "text-sky-400"
          }`}
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleBlockToggle("header-two")}
          className={`p-2 rounded-lg ${
            RichUtils.getCurrentBlockType(editorState) === "header-two"
              ? "bg-sky-700 text-white"
              : "text-sky-400"
          }`}
        >
          <Heading2 className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleBlockToggle("header-three")}
          className={`p-2 rounded-lg ${
            RichUtils.getCurrentBlockType(editorState) === "header-three"
              ? "bg-sky-700 text-white"
              : "text-sky-400"
          }`}
        >
          <Heading2 className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleBlockToggle("ordered-list-item")}
          className={`p-2 rounded-lg ${
            RichUtils.getCurrentBlockType(editorState) === "ordered-list-item"
              ? "bg-sky-700 text-white"
              : "text-sky-400"
          }`}
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleBlockToggle("unordered-list-item")}
          className={`p-2 rounded-lg ${
            RichUtils.getCurrentBlockType(editorState) === "unordered-list-item"
              ? "bg-sky-700 text-white"
              : "text-sky-400"
          }`}
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={handleAddImage}
          className="p-2 rounded-lg text-sky-400"
        >
          <Image className="w-5 h-5" />
        </button>
        <button
          onClick={handleAddVideo}
          className="p-2 rounded-lg text-sky-400"
        >
          <Video className="w-5 h-5" />
        </button>
        <button
          onClick={handleAddTable}
          className="p-2 rounded-lg text-sky-400"
        >
          <PlusCircle className="w-5 h-5" />
        </button>
        <button onClick={handleAddLink} className="p-2 rounded-lg text-sky-400">
          <Link className="w-5 h-5" />
        </button>
        <button
          onClick={handleAddContent}
          className="p-2 rounded-lg text-sky-400"
        >
          <Code className="w-5 h-5" />
        </button>
      </div>

      {/* Font Type Dropdown */}
      <div className="flex items-center">
        <select
          value={fontType}
          onChange={(e) => handleFontChange(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Font</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Impact">Impact</option>
          <option value="Tahoma">Tahoma</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>

      {/* Text Color Picker */}
      <div className="flex items-center">
        <input
          type="color"
          value={textColor}
          onChange={(e) => handleTextColorChange(e.target.value)}
          className="w-8 h-8 p-0 m-0 border-0"
        />
      </div>

      {/* Highlight Color Picker */}
      <div className="flex items-center">
        <input
          type="color"
          value={highlightColor}
          onChange={(e) => handleHighlightChange(e.target.value)}
          className="w-8 h-8 p-0 m-0 border-0"
        />
      </div>
    </div>
  );
};

export default Toolbar;

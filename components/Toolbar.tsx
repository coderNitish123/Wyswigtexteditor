"use client";

import React, { useState, useRef } from "react";
import {
  EditorState,
  RichUtils,
  ContentState,
  convertToRaw,
  AtomicBlockUtils,
} from "draft-js";
import { Editor } from "draft-js";
import "draft-js/dist/Draft.css";
import { convertFromRaw } from "draft-js";
// Import Draft.js base styles

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  ListOrdered,
  List,
  Heading2,
  Video,
  Link,
  PlusCircle,
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
    options: ["bold", "italic", "underline", "strikethrough"],
  },
  blockType: {
    inDropdown: true,
    options: ["Normal", "H1", "H2", "H3", "Blockquote", "Code"],
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
    ],
  },
  link: {
    options: ["link", "unlink"],
    defaultTargetOption: "_self",
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handlers for text formatting, block styles, and custom actions
  const handleToggle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const handleBlockToggle = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const handleAddContent = () => {
    const contentState = editorState.getCurrentContent();
    const newContentState = ContentState.createFromText("Your Text Here");
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "insert-characters"
    );
    setEditorState(newEditorState);
  };

  const handleAddImageFromInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        if (url) {
          const contentState = editorState.getCurrentContent();
          const contentStateWithEntity = contentState.createEntity(
            "IMAGE",
            "IMMUTABLE",
            { src: url }
          );
          const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
          const newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity,
          });
          setEditorState(
            AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Render block function for atomic blocks (like images and videos)
  const blockRendererFn = (contentBlock: any) => {
    const type = contentBlock.getType();
    if (type === "atomic") {
      return {
        component: MediaBlockRenderer,
        editable: false,
      };
    }
    return null;
  };

  // Media block renderer component to render images and videos
  const MediaBlockRenderer = (props: any) => {
    const contentState = editorState.getCurrentContent();
    const entity = contentState.getEntity(props.block.getEntityAt(0));
    const { src } = entity.getData();
    const type = entity.getType();

    return (
      <div className="my-4">
        {type === "IMAGE" && (
          <img src={src} alt="Inserted image" style={{ maxWidth: "100%" }} />
        )}
        {type === "VIDEO" && (
          <div className="video-container">
            <video controls src={src} style={{ maxWidth: "100%" }} />
          </div>
        )}
      </div>
    );
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
          onClick={triggerFileInput}
          className="p-2 rounded-lg text-sky-400"
        >
          <PlusCircle className="w-5 h-5" />
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleAddImageFromInput}
          />
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
      </div>
    </div>
  );
};

export default Toolbar;

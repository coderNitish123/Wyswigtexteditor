"use client";

import React, { useState } from "react";
import DraftEditorComponent from "./TextEditor";
import { v4 as uuidv4 } from "uuid";
import { convertFromRaw, convertToRaw } from "draft-js";

const Todo = () => {
  const [content, setContent] = useState<string>("");

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const contentState = JSON.parse(content);
      const plainText = convertFromRaw(contentState).getPlainText();

      const data = {
        id: uuidv4(),
        content: plainText,
      };

      const existingDataString = localStorage.getItem("myData");
      const existingData = existingDataString
        ? JSON.parse(existingDataString)
        : [];
      const updatedData = [...existingData, data];
      localStorage.setItem("myData", JSON.stringify(updatedData));
      setContent(""); // Clear content
    } catch (error) {
      console.error("Error parsing content:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl w-full grid place-items-center mx-auto pt-10 mb-10"
    >
      <div className="text-3xl text-center text-sky-300 mb-10">
        Notes Picker
      </div>
      <DraftEditorComponent content={content} onChange={handleContentChange} />
      <button
        type="submit"
        className="px-4 bg-sky-700 text-white py-2 rounded-md mt-4"
      >
        Add
      </button>
    </form>
  );
};

export default Todo;

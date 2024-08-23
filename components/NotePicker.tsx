"use client";

import React, { useState, useEffect } from "react";
import DraftEditorComponent from "./TextEditor"; // Ensure correct import path
import { v4 as uuidv4 } from "uuid";
import { convertFromRaw, convertToRaw } from "draft-js";

interface Note {
  id: string;
  content: string; // Raw content state
}

const Todo = () => {
  const [content, setContent] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");

  useEffect(() => {
    // Retrieve existing notes from localStorage on component mount
    const existingNotesString = localStorage.getItem("myData");
    if (existingNotesString) {
      setNotes(JSON.parse(existingNotesString));
    }
  }, []);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Parse the content to get the raw content state
      const contentState = JSON.parse(content);
      const plainText = convertFromRaw(contentState).getPlainText();

      const newNote = {
        id: uuidv4(),
        content: JSON.stringify(contentState), // Save raw content state
      };

      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      localStorage.setItem("myData", JSON.stringify(updatedNotes));

      setContent(""); // Clear content
    } catch (error) {
      console.error("Error parsing content:", error);
    }
  };

  const handleEdit = (id: string, content: string) => {
    setEditNoteId(id);
    setEditContent(content);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const contentState = JSON.parse(editContent);
      const updatedNotes = notes.map((note) =>
        note.id === editNoteId
          ? { ...note, content: JSON.stringify(contentState) }
          : note
      );

      setNotes(updatedNotes);
      localStorage.setItem("myData", JSON.stringify(updatedNotes));

      setEditNoteId(null);
      setEditContent("");
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  const handleDelete = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("myData", JSON.stringify(updatedNotes));
  };

  return (
    <div className="max-w-3xl w-full mx-auto pt-10 mb-10">
      <div className="text-3xl text-center text-sky-300 mb-10">
        Notes Picker
      </div>
      <form onSubmit={handleSubmit} className="mb-10">
        <DraftEditorComponent
          content={content}
          onChange={handleContentChange}
        />
        <button
          type="submit"
          className="px-4 bg-sky-700 text-white py-2 rounded-md mt-4"
        >
          Add
        </button>
      </form>

      {editNoteId && (
        <form onSubmit={handleUpdate} className="mb-10">
          <div className="text-2xl text-center text-sky-300 mb-6">
            Edit Note
          </div>
          <DraftEditorComponent
            content={editContent}
            onChange={setEditContent}
          />
          <button
            type="submit"
            className="px-4 bg-green-700 text-white py-2 rounded-md mt-4"
          >
            Update
          </button>
        </form>
      )}

      <div>
        {notes.map((note) => (
          <div key={note.id} className="mb-4 border p-4 rounded-md">
            <DraftEditorComponent
              content={note.content}
              onChange={() => {}}
              readOnly
            />
            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleEdit(note.id, note.content)}
                className="px-4 bg-yellow-500 text-white py-1 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(note.id)}
                className="px-4 bg-red-500 text-white py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;

import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createNote } from '../../reducers/private/notes/noteSlice';
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { Note } from '../../reducers/private/notes/noteSlice';
import io from 'socket.io-client';
import { Editor } from '@tinymce/tinymce-react';
import Select from 'react-select';
import Dropdown from '../shared/Dropdown';
import { useNavigate } from 'react-router-dom';

const socket = io(import.meta.env.VITE_APP_BASE_API, { transports: ['websocket'] });

interface Props {
  note: Note;
}

const MAX_TAGS = 3;
const tagOptions = [
  { value: '#tag1', label: '#Tag 1' },
  { value: '#tag2', label: '#Tag 2' },
  { value: '#tag3', label: '#Tag 3' },
  { value: '#tag4', label: '#Tag 4' },
  { value: '#tag5', label: '#Tag 5' },
];

const UpdateNote = ({ note }: Props) => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.note.notes);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('noteUpdated', (newNote: Note) => {
      const { title, note } = newNote;
      if (!notes.some((existingNote) => existingNote.title === title && existingNote.note === note)) {
        dispatch(createNote.fulfilled(newNote, '', { noteData: newNote }));
      }
    });

    return () => {
      socket.off('noteUpdated');
    };
  }, [dispatch, notes]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setSelectedTags(note.tags.map((tag) => tagOptions.find((option) => option.value === tag)!));
    setNoteEditorContent(note.note);
  }, [note]);

  const [noteEditorContent, setNoteEditorContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<{ value: string; label: string }[]>([]);
  const category = ['fun', 'school', 'home'];


  return (
    <Formik
    initialValues={{
      category: note?.category || '',
      title: note?.title || '',
      tags: [] as string[], 
      isPersonal: note?.isPersonal || false,
      note: '',
    }}
    onSubmit={(values) => {
      values.note = noteEditorContent;
      values.tags = selectedTags.map((tag) => tag.value) as string[];
  
      dispatch(createNote({ noteData: values }));
      navigate(-1);
    }}
  >
      {(props) => (
        <Form className="!text-black" onSubmit={props.handleSubmit}>
          <Dropdown
            item={category}
            setItem={props.setFieldValue}
            placeholder="Select category"
            label={'category'}
          />
          <div>
            <Field type="text" name="title" className="w-full py-1 mt-4" placeholder="Enter title" />
            <ErrorMessage name="title" component="div" />
          </div>

          <div>
            <label htmlFor="tags">Tags</label>
            <Select
              isMulti
              value={selectedTags}
              options={tagOptions}
              onChange={(selectedOptions) => {
                if (selectedOptions && selectedOptions.length > MAX_TAGS) {
                  setSelectedTags(selectedOptions.slice(0, MAX_TAGS));
                } else {
                  setSelectedTags(selectedOptions as { value: string; label: string }[]);
                }
              }}
              placeholder="Select tags..."
            />
            <ErrorMessage name="tags" component="div" />
          </div>

          <div className="flex items-center space-x-2 py-3">
            <p className="text-white">Is a personal note</p>
            <Field checked={note?.isPersonal} type="checkbox" name="isPersonal" />
          </div>

          <div>
            <label htmlFor="note">Note</label>
            <Editor
              apiKey="zmzfqa3lxt08vbiimz3xvv82g1ewodd5hqynx9d1557vvorj"
              value={noteEditorContent}
              onEditorChange={setNoteEditorContent}
              init={{
                height: 300,
                menubar: false,
                placeholder: 'Write your note here',
                plugins: 'lists wordcount code forecolor backcolor',
                toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | code | numlist bullist | forecolor backcolor',
              }}
            />
            <ErrorMessage name="note" component="div" />
          </div>

          <button className="bg-black text-white px-4 py-1" type="submit">
            Update Note
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateNote;

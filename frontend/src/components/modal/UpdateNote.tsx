import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateNote } from '../../reducers/private/notes/noteSlice';
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { Note } from '../../reducers/private/notes/noteSlice';
import io from 'socket.io-client';
import { Editor } from '@tinymce/tinymce-react';
import Select from 'react-select';
import Dropdown from '../shared/Dropdown';
import { useNavigate } from 'react-router-dom';
import { tagOptions } from '../../utils/general';

const socket = io(import.meta.env.VITE_APP_BASE_API, { transports: ['websocket'] });

interface Props {
  note: Note;
}

const MAX_TAGS = 3;


const UpdateNote = ({ note }: Props) => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.note.notes);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    category: Yup.string().required('Category is required'),
    title: Yup.string().required('Title is required'),
    tags: Yup.array().test('max-tags', 'You can add a maximum of 3 tags', (value) => {
      return !value || value.length <= MAX_TAGS;
    }),
    isPersonal: Yup.boolean().required('Please select if it is a personal note or not'),
    note: Yup.string().required('Note is required'),
  });

  useEffect(() => {
    socket.on('noteUpdated', (newNote: Note) => {
      const { title, note } = newNote;
      if (!notes.some((existingNote) => existingNote.title === title && existingNote.note === note)) {
        dispatch(updateNote.fulfilled(newNote, '', { noteData: newNote }));
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
  const category = [...new Set(notes?.map((val: Note) => val.category))];


  return (
    <div>
      <h2 className='pb-2'>Update Note</h2>

      <Formik
        initialValues={{
          category: note?.category || '',
          title: note?.title || '',
          tags: [] as string[],
          isPersonal: note?.isPersonal || false,
          note: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          values.note = noteEditorContent;
          values.tags = selectedTags.map((tag) => tag.value) as string[];

          dispatch(updateNote({ noteId: note?._id, noteData: values }));
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
              <Field type="text" name="title" className="w-full py-1 mt-4 px-2" placeholder="Enter title" />
              <ErrorMessage className={'text-red-500 text-[12px]'} name="title" component="div" />
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
              <p className="text-white text-[18px]">Is a personal note?</p>
              <Field checked={props.values?.isPersonal} type="checkbox" name="isPersonal" />
            </div>

            <div>
              <Editor
                apiKey="zmzfqa3lxt08vbiimz3xvv82g1ewodd5hqynx9d1557vvorj"
                value={noteEditorContent}
                onEditorChange={setNoteEditorContent}
                onBlur={() => {
                  props.setFieldValue('note', noteEditorContent);
                  props.setFieldTouched('note', true);
                }}
                init={{
                  height: 300,
                  menubar: false,
                  placeholder: 'Write your note here',
                  plugins: 'lists wordcount code forecolor backcolor',
                  toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | code | numlist bullist | forecolor backcolor',
                }}
              />
              <ErrorMessage className={'text-red-500 text-[12px]'} name="note" component="div" />
            </div>

            <button className="bg-[#2a3e71] text-white px-4 py-2 mt-4 rounded-[10px] w-full" type="submit">
              Update Note
            </button>
          </Form>
        )}
      </Formik>
    </div>

  );
};

export default UpdateNote;

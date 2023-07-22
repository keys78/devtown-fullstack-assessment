import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createNote, getSharedNotes } from '../../reducers/private/notes/noteSlice';
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { Note } from '../../reducers/private/notes/noteSlice';
import { Editor } from '@tinymce/tinymce-react';
import Select from 'react-select';
import Dropdown from '../shared/Dropdown';
import { tagOptions } from '../../utils/general';

interface Props {
  setIsNoteForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const NoteForm = ({ setIsNoteForm }: Props) => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.note.notes);
  const { isLoading, isSuccess } = useAppSelector((state) => state.note);
  const [noteEditorContent, setNoteEditorContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<{ value: string; label: string }[]>([]);
  const category = [...new Set(notes?.map((val: Note) => val.category))];


  const MAX_TAGS = 3;
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
    dispatch(getSharedNotes())
  }, [dispatch])

  


  return (
    <div>
      <h2 className='pb-2'>Create Note</h2>
      <Formik
        initialValues={{
          category: '',
          title: '',
          tags: [] as string[],
          isPersonal: false,
          note: noteEditorContent,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          values.tags = selectedTags.map(tag => tag.value) as string[]
          dispatch(createNote({ noteData: values }));
          isSuccess === true && setIsNoteForm(false)
        }}
      >
        {(props) => (
          <Form className='!text-black' onSubmit={props.handleSubmit}>
            <Dropdown
              item={category}
              setItem={props?.setFieldValue}
              placeholder='Select category or create one'
              label={'category'}
            />
            <div>
              <Field type="text" name="title" className="w-full py-2 rounded-[5px] my-5 px-2 " placeholder="Enter title" />
              <ErrorMessage className={'text-red-500 text-[12px]'} name="title" component="div" />
            </div>

            <div>
              <Select
                isMulti
                className='relative z-50'
                value={selectedTags}
                options={tagOptions}
                onBlur={() => {
                  props.setFieldTouched('tags', true);
                }}
                onChange={(selectedOptions) => {
                  if (selectedOptions && selectedOptions.length > MAX_TAGS) {
                    setSelectedTags(selectedOptions.slice(0, MAX_TAGS));
                  } else {
                    setSelectedTags(selectedOptions as { value: string; label: string }[]);
                  }
                }}
                placeholder="Select tags..."
              />
              {props.touched.tags && props.errors.tags && (
                <div className={'text-red-500 text-[12px]'}>{props.errors.tags}</div>
              )}
            </div>

            <div className="flex items-center space-x-2 py-3">
              <p className="text-white text-[18px]">Is a personal note?</p>
              <Field type="checkbox" name="isPersonal" />
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
              {isLoading ? 'Adding Note...' : 'Add Note'}</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NoteForm;
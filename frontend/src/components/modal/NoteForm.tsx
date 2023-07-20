// import { useEffect, useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { createNote } from '../reducers/private/notes/noteSlice';
// import { useAppDispatch, useAppSelector } from '../network/hooks';
// import { Note } from '../reducers/private/notes/noteSlice';
// import io from 'socket.io-client';
// import { Editor } from '@tinymce/tinymce-react';

// const socket = io('http://localhost:4000', { transports: ['websocket'] });

// const initialValues = {
//   title: '',
//   note: '',
//   status: '',
//   createdBy: '',
// };

// const validationSchema = Yup.object({
//   title: Yup.string().required('Title is required'),
//   status: Yup.string().required('Status is required'),
//   createdBy: Yup.string().required('Created By is required'),
// });

// const NoteForm = () => {
//   const dispatch = useAppDispatch();
//   const notes = useAppSelector((state) => state.note.notes);

//   useEffect(() => {
//     socket.on('noteCreated', (newNote: Note) => {
//       const { title, note } = newNote;
//       if (!notes.some((existingNote) => existingNote.title === title && existingNote.note === note)) {
//         dispatch(createNote.fulfilled(newNote, '', { noteData: newNote }));
//       }
//     });

//     return () => {
//       socket.off('noteCreated');
//     };
//   }, [dispatch, notes]);

//   const [noteEditorContent, setNoteEditorContent] = useState('');

//   return (
//     <>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={(values) => {
//           values.note = noteEditorContent;

//           dispatch(createNote({ noteData: values }));
//         }}
//       >
//         {({ handleSubmit }) => (
//           <Form onSubmit={handleSubmit}>
//             <div>
//               <Field type="text" name="title" placeholder="Enter title" label={'Title'} />
//               <ErrorMessage name="title" component="div" />
//             </div>


//             <div>
//               <Editor
//                 apiKey="zmzfqa3lxt08vbiimz3xvv82g1ewodd5hqynx9d1557vvorj" 
//                 value={noteEditorContent}
//                 onEditorChange={setNoteEditorContent}
//                 init={{
//                   height: 300,
//                   menubar: false,
//                   plugins: 'lists wordcount code forecolor backcolor',
//                   toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | code | numlist bullist | forecolor backcolor',
//                 }}

//               />
//               <ErrorMessage name="note" component="div" />
//             </div>

//             <div>
//               <Field type="text" name="status" placeholder="Enter status" />
//               <ErrorMessage name="status" component="div" />
//             </div>
//             <div>
//               <Field type="text" name="createdBy" placeholder="Enter createdBy" />
//               <ErrorMessage name="createdBy" component="div" />
//             </div>
//             <button type="submit">Add Note</button>
//           </Form>
//         )}
//       </Formik>
//     </>
//   );
// };

// export default NoteForm;




import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
import { createNote } from '../../reducers/private/notes/noteSlice';
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { Note } from '../../reducers/private/notes/noteSlice';
import io from 'socket.io-client';
import { Editor } from '@tinymce/tinymce-react';
import Select from 'react-select';
import Dropdown from '../shared/Dropdown';

const socket = io(import.meta.env.VITE_APP_BASE_API, { transports: ['websocket'] });



// const validationSchema = Yup.object({
//   category: Yup.string().required('Category is required'),
//   title: Yup.string().required('Title is required'),
//   tags: Yup.array().test('max-tags', 'You can add a maximum of 3 tags', (value) => {
//     return !value || value.length <= MAX_TAGS;
//   }),
//   status: Yup.string().required('Status is required'),
//   createdBy: Yup.string().required('Created By is required'),
//   note: Yup.string().required('Note is required'),
// });

const MAX_TAGS = 3;
const tagOptions = [
  { value: '#tag1', label: '#Tag 1' },
  { value: '#tag2', label: '#Tag 2' },
  { value: '#tag3', label: '#Tag 3' },
  { value: '#tag4', label: '#Tag 4' },
  { value: '#tag5', label: '#Tag 5' },
  // Add more tags options here if needed
];





const NoteForm = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.note.notes);

  useEffect(() => {
    socket.on('noteCreated', (newNote: Note) => {
      const { title, note } = newNote;
      if (!notes.some((existingNote) => existingNote.title === title && existingNote.note === note)) {
        dispatch(createNote.fulfilled(newNote, '', { noteData: newNote }));
      }
    });

    return () => {
      socket.off('noteCreated');
    };
  }, [dispatch, notes]);

  const [noteEditorContent, setNoteEditorContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<{ value: string; label: string }[]>([]);
  const category = ['fun', 'school', 'home']
  

  return (
    <>
      <Formik
        initialValues={{
          category: '',
          title: '',
          tags: [] as any,
          isPersonal: false,
          note: '',
        }}
        // validationSchema={validationSchema}
        onSubmit={(values) => {
          values.note = noteEditorContent;
          values.tags = selectedTags.map(tag => tag.value) as string[]; // Explicitly cast the type

          dispatch(createNote({ noteData: values }));
          console.log('sending', values)
        }}
      >
        {/* {({ handleSubmit }) => ( */}
        {(props) => (

          <Form className='!text-black' onSubmit={props.handleSubmit}>
            <Dropdown
              item={category}
              setItem={props?.setFieldValue}
              placeholder='Select category'
              label={'category'}
            />
            <div>
              <label htmlFor="title">Title</label>
              <Field type="text" name="title" placeholder="Enter title" />
              <ErrorMessage name="title" component="div" />
            </div>

            {/* <TagsField name="tags" value={props.values.tags} onChange={props.setFieldValue} /> */}

            <div>
              <label htmlFor="tags">Tags</label>
              <Select
                isMulti
                value={selectedTags} // Use selectedTags for the value
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


            <div className='flex'>
              <p className='text-white'>Is a personal note</p>
              <Field type="checkbox" name="isPersonal" />
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

            <button type="submit">Add Note</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default NoteForm;





// // {isPreviewMode && (
// //     <div className='bg-red-500 w-[600px]'>
// //       <h1>{formik.values.title}</h1>
// //       <div dangerouslySetInnerHTML={{ __html: noteEditorContent }} />
// //       <p>{formik.values.status}</p>
// //       <p>{formik.values.createdBy}</p>
// //     </div>
// //   )}

// //   {/* Add Preview and Edit buttons */}
// //   {isPreviewMode ? (
// //     <button type="button" onClick={handleEditClick}>
// //       Edit
// //     </button>
// //   ) : (
// //     <button type="button" onClick={handlePreviewClick}>
// //       Preview
// //     </button>
// //   )}

 {/* Add Preview and Edit buttons */}
// //                         {isPreviewMode ? (
// //                             <button type="button" onClick={handleEditClick}>
// //                                 Edit
// //                             </button>
// //                         ) : (
// //                             <button type="button" onClick={handlePreviewClick}>
// //                                 Preview
// //                             </button>
// //                         )}

// //                         <button type="submit">{isPreviewMode ? 'Save' : 'Add Note'}</button>
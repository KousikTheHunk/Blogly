import React, { useId, useState } from 'react';
import conf from '../conf/conf';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';


export default function RTE({
  name,
  control,
  label,
  defaultValue = ''
}) {
  const id = useId();
  const [focused, setFocused] = useState(false);

  // Inline style definitions replacing Tailwind utilities
  const styles = {
    wrapper: {
      width: '100%'                              // w-full → width:100% 
    },
    label: {
      display: 'inline-block',
      marginBottom: '0.25rem',                   // mb-1 → margin-bottom:0.25rem 
      paddingLeft: '0.25rem',                    // pl-1 → padding-left:0.25rem 
      fontWeight: 500,
      color: '#111827'
    },
    editorContainer: {
      border: '1px solid #d1d5db',               // use a light gray border
      borderRadius: '0.5rem',                    // rounded-lg → 0.5rem
      transition: 'border-color 0.2s ease',
      ...(focused && { borderColor: '#2563eb' }) // focus:border-blue-600
    }
  };

  return (
    <div style={styles.wrapper}>
      {label && (
        <label htmlFor={id} style={styles.label}>
          {label}
        </label>
      )}

      <Controller
        name={name || 'content'}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange } }) => (
          <div
            style={styles.editorContainer}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          >
            <Editor
             apiKey={conf.tinyEditor}
              id={id}
              initialValue={defaultValue}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  'image',
                  'advlist',
                  'autolink',
                  'lists',
                  'link',
                  'charmap',
                  'preview',
                  'anchor',
                  'searchreplace',
                  'visualblocks',
                  'code',
                  'fullscreen',
                  'insertdatetime',
                  'media',
                  'table',
                  'help',
                  'wordcount'
                ],
                toolbar:
                  'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
              onEditorChange={onChange}
            />
          </div>
        )}
      />
    </div>
  );
}

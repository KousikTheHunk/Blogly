import React, { useId, useState } from 'react';

const Input = React.forwardRef(function Input(
  { label, type = 'text', style: userStyle = {}, ...props },
  ref
) {
  const id = useId();
  const [isFocused, setFocused] = useState(false);

  // Style objects replacing Tailwind utilities
  const styles = {
    wrapper: {
      width: '100%'                                    // w-full 
    },
    label: {
      display: 'inline-block',
      marginBottom: '0.25rem',                         // mb-1 
      paddingLeft: '0.25rem',                          // pl-1 
      fontWeight: 500,
      color: '#111827'                                 // dark gray text
    },
    input: {
      width: '100%',
      padding: '0.5rem 0.75rem',                       // py-2 px-3 
      borderRadius: '0.5rem',                          // rounded-lg 
      backgroundColor: '#ffffff',                      // bg-white 
      color: '#000000',                                // text-black 
      border: '1px solid #e5e7eb',                     // border-gray-200 
      outline: 'none',
      transition: 'background-color 0.2s ease',
      ...(isFocused && { backgroundColor: '#f9fafb' }) // focus:bg-gray-50 
    }
  };

  return (
    <div style={styles.wrapper}>
      {label && (
        <label htmlFor={id} style={styles.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        ref={ref}
        style={{ ...styles.input, ...userStyle }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
    </div>
  );
});


export default Input;

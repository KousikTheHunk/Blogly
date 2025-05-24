import React, { useId, useState } from 'react';

function Select(
  {
    options,
    label,
    style: userStyle = {},
    labelStyle: userLabelStyle = {},
    selectStyle: userSelectStyle = {},
    ...props
  },
  ref
) {
  const id = useId();
  const [focused, setFocused] = useState(false);

  // Inline style definitions
  const styles = {
    wrapper: {
      width: '100%'                               // w-full
    },
    label: {
      display: 'inline-block',
      marginBottom: '0.25rem',                    // mb-1
      paddingLeft: '0.25rem',                     // pl-1
      fontWeight: 500,
      color: '#111827',
      ...userLabelStyle
    },
    select: {
      width: '100%',                              // w-full
      padding: '0.5rem 0.75rem',                  // py-2 px-3
      borderRadius: '0.5rem',                     // rounded-lg
      backgroundColor: focused ? '#f9fafb' : '#ffffff', // focus:bg-gray-50 / bg-white
      color: '#000000',                           // text-black
      border: '1px solid #e5e7eb',                // border-gray-200
      outline: 'none',
      transition: 'background-color 0.2s ease',
      boxSizing: 'border-box',
      ...userSelectStyle
    }
  };

  return (
    <div style={styles.wrapper}>
      {label && (
        <label htmlFor={id} style={styles.label}>
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        style={styles.select}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select)

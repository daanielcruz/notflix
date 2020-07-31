import React from 'react';
import { FormFieldWrapper, Label, Input } from './styles';

interface iCategory {
  id: number;
  title: string;
}

interface FormFieldProps {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  type: string;
  suggestions?: iCategory[];
}

const FormField = ({
  label,
  type,
  name,
  value,
  onChange,
  suggestions = [],
}: FormFieldProps) => {
  const isTypeTextArea = type === 'textarea';
  const tag: any = isTypeTextArea ? 'textarea' : 'input';
  const fieldId = `id_${name}`;
  const hasSuggestions = Boolean(suggestions.length);

  return (
    <FormFieldWrapper>
      <Label>
        <Input
          as={tag}
          id={fieldId}
          type={type}
          value={value}
          name={name}
          onChange={onChange}
          autoComplete={'off'}
          list={hasSuggestions ? `suggestionFor_${fieldId}` : undefined}
          required
        />
        <Label.Text>{label}:</Label.Text>

        <datalist id={`suggestionFor_${fieldId}`}>
          {suggestions.map((suggestion) => (
            <option value={suggestion.title} key={suggestion.id}>
              {suggestion.title}
            </option>
          ))}
        </datalist>
      </Label>
    </FormFieldWrapper>
  );
};

export default FormField;

import React from 'react';
import { FormFieldWrapper, Label, Input } from './styles';

const FormField = ({ label, type, name, value, onChange }: FormFieldProps) => {
  const isTypeTextArea = type === 'textarea';
  const tag: any = isTypeTextArea ? 'textarea' : 'input';

  return (
    <FormFieldWrapper>
      <Label>
        <Input
          as={tag}
          type={type}
          value={value}
          name={name}
          onChange={onChange}
        />
        <Label.Text>{label}:</Label.Text>
      </Label>
    </FormFieldWrapper>
  );
};

interface FormFieldProps {
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  type: string;
}

export default FormField;

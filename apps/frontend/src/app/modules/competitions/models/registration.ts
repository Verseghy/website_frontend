export interface RegistrationSection {
  title: string
  sections: RegistrationSubSection[]
}

export interface RegistrationSubSection {
  title?: string
  fields: RegistrationField[]
}

export interface RegistrationField {
  name: string
  type: InputType
  column: FieldColumn
}

export interface SelectField extends RegistrationField {
  type: InputType.SELECT
  options: string[]
}

export interface RadioField extends RegistrationField {
  type: InputType.RADIO
  options: string[]
}

export enum FieldColumn {
  RIGHT = 'right',
  LEFT = 'left',
  BOTH = 'both',
}

export enum InputType {
  TEXT = 'text',
  NUMBER = 'number',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
}

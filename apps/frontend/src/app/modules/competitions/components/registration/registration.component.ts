import { Component, OnInit } from '@angular/core'
import { Observable, of } from 'rxjs'
import {
  FieldColumn,
  SelectField,
  InputType,
  RegistrationSection,
  RegistrationField,
  RadioField,
} from '../../models/registration'

@Component({
  selector: 'verseghy-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  sections$: Observable<RegistrationSection[]> = of([
    {
      title: 'Lorem Ipsum 1',
      sections: [
        {
          title: 'Lorem ipsum dolor sit amet',
          fields: [
            {
              name: 'Text field',
              type: InputType.TEXT,
              column: FieldColumn.LEFT,
            },
            {
              name: 'Number field',
              type: InputType.NUMBER,
              column: FieldColumn.LEFT,
            },
            {
              name: 'Text field',
              type: InputType.TEXT,
              column: FieldColumn.LEFT,
            },
            {
              name: 'Number field',
              type: InputType.NUMBER,
              column: FieldColumn.RIGHT,
            },
            {
              name: 'Select field',
              type: InputType.SELECT,
              column: FieldColumn.LEFT,
              options: ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'],
            },
            {
              name: 'Checkbox field',
              type: InputType.CHECKBOX,
              column: FieldColumn.RIGHT,
            },
            {
              name: 'Radio field',
              type: InputType.RADIO,
              column: FieldColumn.BOTH,
              options: ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'],
            },
          ]
        },
        {
          title: 'Lorem ipsum dolor sit amet 2',
          fields: [
            {
              name: 'Text field',
              type: InputType.TEXT,
              column: FieldColumn.LEFT,
            },
            {
              name: 'Text field 2',
              type: InputType.TEXT,
              column: FieldColumn.RIGHT,
            },
            {
              name: 'Select field',
              type: InputType.SELECT,
              column: FieldColumn.LEFT,
              options: ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'],
            },
            {
              name: 'Checkbox field',
              type: InputType.CHECKBOX,
              column: FieldColumn.RIGHT,
            },
            {
              name: 'Radio field',
              type: InputType.RADIO,
              column: FieldColumn.BOTH,
              options: ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'],
            },
          ]
        }
      ]
    },
    {
      title: 'Lorem Ipsum 2',
      sections: [
        {
          title: 'Lorem ipsum dolor sit amet',
          fields: [
            {
              name: 'Text field',
              type: InputType.TEXT,
              column: FieldColumn.LEFT,
            },
            {
              name: 'Text field 2',
              type: InputType.TEXT,
              column: FieldColumn.RIGHT,
            },
            {
              name: 'Select field',
              type: InputType.SELECT,
              column: FieldColumn.LEFT,
              options: ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'],
            },
            {
              name: 'Checkbox field',
              type: InputType.CHECKBOX,
              column: FieldColumn.RIGHT,
            },
            {
              name: 'Radio field',
              type: InputType.RADIO,
              column: FieldColumn.BOTH,
              options: ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'],
            },
          ]
        },
        {
          title: 'Lorem ipsum dolor sit amet 2',
          fields: [
            {
              name: 'Text field',
              type: InputType.TEXT,
              column: FieldColumn.LEFT,
            },
            {
              name: 'Text field 2',
              type: InputType.TEXT,
              column: FieldColumn.RIGHT,
            },
            {
              name: 'Select field',
              type: InputType.SELECT,
              column: FieldColumn.LEFT,
              options: ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'],
            },
            {
              name: 'Checkbox field',
              type: InputType.CHECKBOX,
              column: FieldColumn.RIGHT,
            },
            {
              name: 'Radio field',
              type: InputType.RADIO,
              column: FieldColumn.BOTH,
              options: ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'],
            },
          ]
        }
      ]
    },
    {
      title: 'Lorem Ipsum 3',
      sections: [
        {
          title: 'Lorem ipsum dolor sit amet',
          fields: [
            {
              name: 'Text field',
              type: InputType.TEXT,
              column: FieldColumn.LEFT,
            },
            {
              name: 'Text field 2',
              type: InputType.TEXT,
              column: FieldColumn.RIGHT,
            },
            {
              name: 'Select field',
              type: InputType.SELECT,
              column: FieldColumn.LEFT,
              options: ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'],
            },
            {
              name: 'Checkbox field',
              type: InputType.CHECKBOX,
              column: FieldColumn.RIGHT,
            },
            {
              name: 'Radio field',
              type: InputType.RADIO,
              column: FieldColumn.BOTH,
              options: ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'],
            },
          ]
        },
        {
          title: 'Lorem ipsum dolor sit amet 2',
          fields: [
            {
              name: 'Text field',
              type: InputType.TEXT,
              column: FieldColumn.LEFT,
            },
            {
              name: 'Text field 2',
              type: InputType.TEXT,
              column: FieldColumn.RIGHT,
            },
            {
              name: 'Select field',
              type: InputType.SELECT,
              column: FieldColumn.LEFT,
              options: ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'],
            },
            {
              name: 'Checkbox field',
              type: InputType.CHECKBOX,
              column: FieldColumn.RIGHT,
            },
            {
              name: 'Radio field',
              type: InputType.RADIO,
              column: FieldColumn.BOTH,
              options: ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'],
            },
          ]
        }
      ]
    }
  ])

  constructor() { }

  ngOnInit(): void {
  }

  asSelectField(field: RegistrationField): SelectField {
    return field as SelectField
  }

  asRadioField(field: RegistrationField): RadioField {
    return field as RadioField
  }

}

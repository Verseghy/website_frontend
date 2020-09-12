import { Component, OnInit } from '@angular/core'
import { Observable, of } from 'rxjs'
import {
  FieldColumn,
  InputType,
  RadioField,
  RegistrationField,
  RegistrationSection,
  SectionColumn,
  SelectField,
} from '../../models/registration'

@Component({
  selector: 'verseghy-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  sections$: Observable<RegistrationSection[]> = of([
    {
      title: 'Pályamunka neve',
      sections: [
        {
          fields: [
            {
              name: '',
              type: InputType.TEXT,
              column: FieldColumn.BOTH,
            }
          ]
        }
      ],
      column: SectionColumn.BOTH,
    },
    {
      title: 'A csapattagok iskolája',
      sections: [
        {
          fields: [
            {
              name: 'Iskola neve',
              type: InputType.TEXT,
              column: FieldColumn.BOTH,
            },
          ]
        },
        {
          title: 'Iskola címe',
          fields: [
            {
              name: 'Irányítószám',
              type: InputType.TEXT,
              column: FieldColumn.LEFT,
            },
            {
              name: 'Város',
              type: InputType.TEXT,
              column: FieldColumn.RIGHT,
            },
            {
              name: 'Utca, házszám',
              type: InputType.TEXT,
              column: FieldColumn.BOTH,
            },
            {
              name: 'Telefonszám',
              type: InputType.TEXT,
              column: FieldColumn.LEFT,
            },
          ]
        }
      ],
      column: SectionColumn.BOTH,
    },
    {
      title: '1. csapattag',
      sections: [
        {
          fields: [
            {
              name: 'Név',
              type: InputType.TEXT,
              column: FieldColumn.BOTH,
            },
            {
              name: 'Osztály',
              type: InputType.TEXT,
              column: FieldColumn.LEFT,
            },
            {
              name: 'Email cím',
              type: InputType.TEXT,
              column: FieldColumn.BOTH,
            },
            {
              name: 'Telefonszám',
              type: InputType.TEXT,
              column: FieldColumn.LEFT,
            },
          ]
        }
      ],
      column: SectionColumn.LEFT,
    },
    {
      title: '2. csapattag',
      sections: [
        {
          fields: [
            {
              name: 'Név',
              type: InputType.TEXT,
              column: FieldColumn.BOTH,
            },
            {
              name: 'Osztály',
              type: InputType.TEXT,
              column: FieldColumn.LEFT,
            },
            {
              name: 'Email cím',
              type: InputType.TEXT,
              column: FieldColumn.BOTH,
            },
            {
              name: 'Telefonszám',
              type: InputType.TEXT,
              column: FieldColumn.LEFT,
            },
          ]
        }
      ],
      column: SectionColumn.RIGHT,
    },
    {
      title: '3. csapattag',
      sections: [
        {
          fields: [
            {
              name: 'Név',
              type: InputType.TEXT,
              column: FieldColumn.BOTH,
            },
            {
              name: 'Osztály',
              type: InputType.TEXT,
              column: FieldColumn.LEFT,
            },
            {
              name: 'Email cím',
              type: InputType.TEXT,
              column: FieldColumn.BOTH,
            },
            {
              name: 'Telefonszám',
              type: InputType.TEXT,
              column: FieldColumn.LEFT,
            },
          ]
        }
      ],
      column: SectionColumn.CENTER,
    },
    {
      title: 'Felkészítő tanár',
      sections: [
        {
          fields: [
            {
              name: 'Név',
              type: InputType.TEXT,
              column: FieldColumn.BOTH,
            },
            {
              name: 'Email cím',
              type: InputType.TEXT,
              column: FieldColumn.BOTH,
            },
            {
              name: 'Telefonszám',
              type: InputType.TEXT,
              column: FieldColumn.LEFT,
            },
          ]
        }
      ],
      column: SectionColumn.CENTER,
    },
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

import { Action, createReducer, on } from '@ngrx/store'
import * as CompetitionsActions from './competitions.actions'
import {
  Competition, CompetitionAboutView,
  CompetitionCardView, CompetitionFAQ,
  CompetitionHeroView, CompetitionHeroViewData,
  CompetitionRegistration, CompetitionRulesView, CompetitionScheduleView,
} from '../../models/competition'
import { addHours } from 'date-fns'
import * as firebase from 'firebase'
import Timestamp = firebase.firestore.Timestamp

export const COMPETITIONS_FEATURE_KEY = 'competitions'

export interface State {
  selectedID?: number
  loaded: boolean
  error?: string | null
  competitions: Competition[],
  entities: {
    [id: number]: Competition
  }
}

export interface CompetitionsPartialState {
  readonly [COMPETITIONS_FEATURE_KEY]: State
}

export const initialState: State = {
  loaded: true,
  competitions: [
    {
      id: 0,
      name: 'Lorem Ipsum',
      year: 2020,
      registration: {
        start: Timestamp.fromDate(new Date()),
        end: Timestamp.fromDate(new Date()),
      },
      card: {
        shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus. Vivamus libero nibh, tristique eu pharetra in, tincidunt at neque.',
        image: 'https://via.placeholder.com/520',
      },
      hero: {
        image: 'https://via.placeholder.com/1920x1080',
        preRegistration: {
          title: 'Lorem Ipsum',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus. Vivamus libero nibh, tristique eu pharetra in, tincidunt at neque.',
        },
        postRegistration: {
          title: 'Lorem Ipsum',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus. Vivamus libero nibh, tristique eu pharetra in, tincidunt at neque.',
        },
        duringRound: {
          title: 'Lorem Ipsum',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus. Vivamus libero nibh, tristique eu pharetra in, tincidunt at neque.',
        },
        afterEvent: {
          title: 'Lorem Ipsum',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus. Vivamus libero nibh, tristique eu pharetra in, tincidunt at neque.',
        },
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus. Vivamus libero nibh, tristique eu pharetra in, tincidunt at neque.',
      },
      about: {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus. Vivamus libero nibh, tristique eu pharetra in, tincidunt at neque. Phasellus dui elit, gravida convallis lacinia quis, elementum non velit. Nam cursus porttitor orci, non pellentesque lacus ultricies ac. Nunc posuere gravida cursus. Curabitur nec mauris ut felis ultrices luctus. Nam venenatis porttitor lacus. Maecenas vulputate risus nec suscipit dictum.\n' +
          'Morbi ornare imperdiet interdum. Maecenas ultricies accumsan velit, id imperdiet risus aliquam ac. Aliquam interdum condimentum nisl, a porttitor nisl auctor sed. Vestibulum dignissim interdum urna, malesuada bibendum eros placerat quis. Donec sed ultrices ex. Aliquam lacinia diam non mi lacinia placerat. Fusce dignissim faucibus eros, nec blandit nunc. Nulla volutpat ac nunc pharetra congue. Quisque posuere, lectus quis ultrices ultrices, erat nisi suscipit erat, quis efficitur enim ante nec mauris. Nulla tristique, dolor ut faucibus vulputate, diam nulla vehicula est, sed ultricies nulla diam non lacus. Vivamus at egestas eros, a tincidunt nisi.'
      },
      schedule: {
        rounds: [
          {
            name: 'Lorem Ipsum',
            start: Timestamp.now(),
            end: Timestamp.fromDate(addHours(new Date(), 2)),
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus.',
          },
          {
            name: 'Lorem Ipsum',
            start: Timestamp.now(),
            end: Timestamp.fromDate(addHours(new Date(), 2)),
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus.',
          },
          {
            name: 'Lorem Ipsum',
            start: Timestamp.now(),
            end: Timestamp.fromDate(addHours(new Date(), 2)),
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus.',
          },
          {
            name: 'Lorem Ipsum',
            start: Timestamp.now(),
            end: Timestamp.fromDate(addHours(new Date(), 2)),
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus.',
          }
        ]
      },
      FAQ: [
        {
          question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus. Vivamus libero nibh, tristique eu pharetra in, tincidunt at neque. Phasellus dui elit, gravida convallis lacinia quis, elementum non velit. Nam cursus porttitor orci, non pellentesque lacus ultricies ac. Nunc posuere gravida cursus. Curabitur nec mauris ut felis ultrices luctus. Nam venenatis porttitor lacus. Maecenas vulputate risus nec suscipit dictum.',
        },
        {
          question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus. Vivamus libero nibh, tristique eu pharetra in, tincidunt at neque. Phasellus dui elit, gravida convallis lacinia quis, elementum non velit. Nam cursus porttitor orci, non pellentesque lacus ultricies ac. Nunc posuere gravida cursus. Curabitur nec mauris ut felis ultrices luctus. Nam venenatis porttitor lacus. Maecenas vulputate risus nec suscipit dictum.',
        },
        {
          question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus. Vivamus libero nibh, tristique eu pharetra in, tincidunt at neque. Phasellus dui elit, gravida convallis lacinia quis, elementum non velit. Nam cursus porttitor orci, non pellentesque lacus ultricies ac. Nunc posuere gravida cursus. Curabitur nec mauris ut felis ultrices luctus. Nam venenatis porttitor lacus. Maecenas vulputate risus nec suscipit dictum.',
        },
        {
          question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus. Vivamus libero nibh, tristique eu pharetra in, tincidunt at neque. Phasellus dui elit, gravida convallis lacinia quis, elementum non velit. Nam cursus porttitor orci, non pellentesque lacus ultricies ac. Nunc posuere gravida cursus. Curabitur nec mauris ut felis ultrices luctus. Nam venenatis porttitor lacus. Maecenas vulputate risus nec suscipit dictum.',
        },
        {
          question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus. Vivamus libero nibh, tristique eu pharetra in, tincidunt at neque. Phasellus dui elit, gravida convallis lacinia quis, elementum non velit. Nam cursus porttitor orci, non pellentesque lacus ultricies ac. Nunc posuere gravida cursus. Curabitur nec mauris ut felis ultrices luctus. Nam venenatis porttitor lacus. Maecenas vulputate risus nec suscipit dictum.',
        },
        {
          question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus. Vivamus libero nibh, tristique eu pharetra in, tincidunt at neque. Phasellus dui elit, gravida convallis lacinia quis, elementum non velit. Nam cursus porttitor orci, non pellentesque lacus ultricies ac. Nunc posuere gravida cursus. Curabitur nec mauris ut felis ultrices luctus. Nam venenatis porttitor lacus. Maecenas vulputate risus nec suscipit dictum.',
        },
        {
          question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus. Vivamus libero nibh, tristique eu pharetra in, tincidunt at neque. Phasellus dui elit, gravida convallis lacinia quis, elementum non velit. Nam cursus porttitor orci, non pellentesque lacus ultricies ac. Nunc posuere gravida cursus. Curabitur nec mauris ut felis ultrices luctus. Nam venenatis porttitor lacus. Maecenas vulputate risus nec suscipit dictum.',
        },
        {
          question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus. Vivamus libero nibh, tristique eu pharetra in, tincidunt at neque. Phasellus dui elit, gravida convallis lacinia quis, elementum non velit. Nam cursus porttitor orci, non pellentesque lacus ultricies ac. Nunc posuere gravida cursus. Curabitur nec mauris ut felis ultrices luctus. Nam venenatis porttitor lacus. Maecenas vulputate risus nec suscipit dictum.',
        },
      ],
      rules: {
        rules: [
          {
            name: 'Lorem ipsum',
            rule: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus. Vivamus libero nibh, tristique eu pharetra in, tincidunt at neque. Phasellus dui elit, gravida convallis lacinia quis, elementum non velit. Nam cursus porttitor orci, non pellentesque lacus ultricies ac.',
          },
          {
            name: 'Lorem ipsum',
            rule: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus. Vivamus libero nibh, tristique eu pharetra in, tincidunt at neque. Phasellus dui elit, gravida convallis lacinia quis, elementum non velit. Nam cursus porttitor orci, non pellentesque lacus ultricies ac.',
          },
          {
            name: 'Lorem ipsum',
            rule: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus. Vivamus libero nibh, tristique eu pharetra in, tincidunt at neque. Phasellus dui elit, gravida convallis lacinia quis, elementum non velit. Nam cursus porttitor orci, non pellentesque lacus ultricies ac.',
          },
          {
            name: 'Lorem ipsum',
            rule: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus. Vivamus libero nibh, tristique eu pharetra in, tincidunt at neque. Phasellus dui elit, gravida convallis lacinia quis, elementum non velit. Nam cursus porttitor orci, non pellentesque lacus ultricies ac.',
          },
          {
            name: 'Lorem ipsum',
            rule: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus. Vivamus libero nibh, tristique eu pharetra in, tincidunt at neque. Phasellus dui elit, gravida convallis lacinia quis, elementum non velit. Nam cursus porttitor orci, non pellentesque lacus ultricies ac.',
          },
          {
            name: 'Lorem ipsum',
            rule: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a sapien eget elit suscipit pulvinar nec nec ante. Integer eleifend lacinia enim blandit rhoncus. Vivamus libero nibh, tristique eu pharetra in, tincidunt at neque. Phasellus dui elit, gravida convallis lacinia quis, elementum non velit. Nam cursus porttitor orci, non pellentesque lacus ultricies ac.',
          },
        ]
      }
    }
  ],
  entities: {}
}

const competitionsReducer = createReducer(
  initialState,
  on(CompetitionsActions.loadRecentCompetitions, (state) => ({ ...state, loaded: false, error: null })),
  on(CompetitionsActions.loadCompetitionsSuccess, (state, { competitions }) => ({
    ...state, competitions, loaded: true, error: null,
    entities: competitions.reduce((acc, curr) => {
      acc[curr.id] = curr
      return acc
    }, {})
  })),
  on(CompetitionsActions.loadCompetitionsFailure, (state, { error }) => ({ ...state, error })),
  on(CompetitionsActions.selectCompetition, (state, { selectedID }) => ({ ...state, selectedID })),
)

export function reducer(state: State | undefined, action: Action) {
  return competitionsReducer(state, action)
}

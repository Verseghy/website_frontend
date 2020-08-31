import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

export interface Competition {
  id: number
  name: string
  year: number
  registration: CompetitionRegistration
  card: CompetitionCardView
  hero: CompetitionHeroView
  about: CompetitionAboutView
  schedule: CompetitionScheduleView
  FAQ: CompetitionFAQ[]
  rules: CompetitionRulesView
}

export interface CompetitionCardView {
  shortDescription: string
  image: string
}

export interface CompetitionHeroView {
  image: string
  preRegistration: CompetitionHeroViewData
  postRegistration: CompetitionHeroViewData
  duringRound?: CompetitionHeroViewData
  afterEvent: CompetitionHeroViewData
  description: string
}

export interface CompetitionHeroViewData {
  title: string
  description: string
  link?: any[]
}

export interface CompetitionAboutView {
  description: string
}

export interface CompetitionScheduleView {
  rounds: CompetitionRound[]
}

export interface CompetitionScheduleView {
  rounds: CompetitionRound[]
}

export interface CompetitionRulesView {
  rules: CompetitionRule[]
}

export interface CompetitionFAQView {
  FAQs: CompetitionFAQ[]
}

export interface CompetitionRegistration {
  start: Timestamp
  end: Timestamp
}

export interface CompetitionRound {
  name: string
  start: Timestamp
  end: Timestamp
  description?: string
}

export interface CompetitionFAQ {
  question: string
  answer: string
}

export interface CompetitionRule {
  name: string
  rule: string
}

export interface Competition {
  id: number
  name: number
  year: number
  registration: CompetitionRegistration
  card: CompetitionCardView
  hero: CompetitionHeroView
  about: CompetitionAboutView
  rounds: CompetitionRound[]
  FAQs: CompetitionFAQ[]
  Rules
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

export interface CompetitionRoundView {
  description: string
}

export enum CompetitionRegistration {
  OPEN = "open",
  CLOSED = "closed"
}

export interface CompetitionRound {
  name: string
  start: Date
  end: Date
  description?: string
}

export interface CompetitionFAQ {
  name: string
  QA: {
    question: string
    answer: string
  }
}

export interface CompetitionRules {
  name: string
  rule: string
}

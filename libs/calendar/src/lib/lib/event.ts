export class Event {
  constructor(
    private _id: number,
    private _title: string,
    private _description: string = '',
    private _startDate: Date,
    private _endDate: Date = _startDate,
    private _color: string = '#3f51b5'
  ) {}

  get id() {
    return this._id
  }

  get title() {
    return this._title
  }

  get description() {
    return this._description
  }

  get startDate() {
    return this._startDate
  }

  get endDate() {
    return this._endDate
  }

  get color() {
    return this._color
  }
}

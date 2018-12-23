export class Event {
  constructor(
    id: number,
    title: string,
    description: string = '',
    startDate: Date,
    endDate: Date = startDate,
    color: string = '#3f51b5'
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._startDate = startDate;
    this._endDate = endDate;
    this._color = color;
  }

  private _id: number;

  get id() {
    return this._id;
  }

  private _title: string;

  get title() {
    return this._title;
  }

  private _description?: string;

  get description() {
    return this._description;
  }

  private _startDate: Date;

  get startDate() {
    return this._startDate;
  }

  private _endDate?: Date;

  get endDate() {
    return this._endDate;
  }

  private _color?: string;

  get color() {
    return this._color;
  }
}

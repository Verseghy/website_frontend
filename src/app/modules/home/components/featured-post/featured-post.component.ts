import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-featured-post',
  templateUrl: './featured-post.component.html',
  styleUrls: ['./featured-post.component.css']
})
export class FeaturedPostComponent implements OnInit, AfterViewInit {

  /* tslint:disable */
  posts = [{ image: 'https://scontent-vie1-1.xx.fbcdn.net/v/t1.15752-9/36029258_1952348851463890_4236921547433967616_n.jpg?_nc_cat=0&oh=4cb548593b3aefe071ef87d296cd1e3f&oe=5BB2DB52', author: 'TwoDCube', id: 0, title: 'Lorem Ipsum 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', labels: [{ title: 'label1', backgroundColor: '#a66bbe' }, { title: 'label1', backgroundColor: '#61c437' }], type: 0 },
  { image: 'https://scontent-vie1-1.xx.fbcdn.net/v/t1.15752-9/36029258_1952348851463890_4236921547433967616_n.jpg?_nc_cat=0&oh=4cb548593b3aefe071ef87d296cd1e3f&oe=5BB2DB52', author: 'TwoDCube', id: 0, title: 'Lorem Ipsum 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', labels: [{ title: 'label1', backgroundColor: '#a66bbe' }, { title: 'label1', backgroundColor: '#61c437' }], type: 0 },
  { image: 'https://scontent-vie1-1.xx.fbcdn.net/v/t1.15752-9/36029258_1952348851463890_4236921547433967616_n.jpg?_nc_cat=0&oh=4cb548593b3aefe071ef87d296cd1e3f&oe=5BB2DB52', author: 'TwoDCube', id: 0, title: 'Lorem Ipsum 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', labels: [{ title: 'label1', backgroundColor: '#a66bbe' }, { title: 'label1', backgroundColor: '#61c437' }], type: 0 },
  { image: 'https://scontent-vie1-1.xx.fbcdn.net/v/t1.15752-9/36029258_1952348851463890_4236921547433967616_n.jpg?_nc_cat=0&oh=4cb548593b3aefe071ef87d296cd1e3f&oe=5BB2DB52', author: 'TwoDCube', id: 0, title: 'Lorem Ipsum 4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', labels: [{ title: 'label1', backgroundColor: '#a66bbe' }, { title: 'label1', backgroundColor: '#61c437' }], type: 0 },
  { image: 'https://scontent-vie1-1.xx.fbcdn.net/v/t1.15752-9/36029258_1952348851463890_4236921547433967616_n.jpg?_nc_cat=0&oh=4cb548593b3aefe071ef87d296cd1e3f&oe=5BB2DB52', author: 'TwoDCube', id: 0, title: 'Lorem Ipsum 5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', labels: [{ title: 'label1', backgroundColor: '#a66bbe' }, { title: 'label1', backgroundColor: '#61c437' }], type: 0 },
  { image: 'https://scontent-vie1-1.xx.fbcdn.net/v/t1.15752-9/36029258_1952348851463890_4236921547433967616_n.jpg?_nc_cat=0&oh=4cb548593b3aefe071ef87d296cd1e3f&oe=5BB2DB52', author: 'TwoDCube', id: 0, title: 'Lorem Ipsum 6', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', labels: [{ title: 'label1', backgroundColor: '#a66bbe' }, { title: 'label1', backgroundColor: '#61c437' }], type: 0 },
  { image: 'https://scontent-vie1-1.xx.fbcdn.net/v/t1.15752-9/36029258_1952348851463890_4236921547433967616_n.jpg?_nc_cat=0&oh=4cb548593b3aefe071ef87d296cd1e3f&oe=5BB2DB52', author: 'TwoDCube', id: 0, title: 'Lorem Ipsum 7', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', labels: [{ title: 'label1', backgroundColor: '#a66bbe' }, { title: 'label1', backgroundColor: '#61c437' }], type: 0 },
  { image: 'https://scontent-vie1-1.xx.fbcdn.net/v/t1.15752-9/36029258_1952348851463890_4236921547433967616_n.jpg?_nc_cat=0&oh=4cb548593b3aefe071ef87d296cd1e3f&oe=5BB2DB52', author: 'TwoDCube', id: 0, title: 'Lorem Ipsum 8', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', labels: [{ title: 'label1', backgroundColor: '#a66bbe' }, { title: 'label1', backgroundColor: '#61c437' }], type: 0 }];
  /* tslint:enable */

  @ViewChildren('content') content: QueryList<any>;

  speed = 300;
  current = 0;
  items;
  itemsLength;


  constructor() { }
  ngOnInit() {
  }

  ngAfterViewInit() {
    this.items = this.content.toArray();
    this.itemsLength = this.items.length;
    for (const i of Object.keys(this.items)) {
      if (Number(i) !== 0) {
        this._transformRight(this.items[i]);
      }
      this._transformLeft(this.items[this.itemsLength - 1]);
    }
  }

  next() {
    this._translateLeft(this.items[this.current]);
    this._translateMiddle(this.items[this._nextId()]);
    this._transformRight(this.items[this._previousId()]);
    this.current = this._nextId();
  }

  previous() {
    this._translateRight(this.items[this.current]);
    this._translateMiddle(this.items[this._previousId()]);
    this.current = this._previousId();
    this._transformLeft(this.items[this._previousId()]);
  }

  private _nextId(): number {
    let nextId = this.current + 1;
    if (nextId > this.itemsLength - 1) {
      nextId = 0;
    }
    return nextId;
  }

  private _previousId(): number {
    let nextId = this.current - 1;
    if (nextId < 0) {
      nextId = this.itemsLength - 1;
    }
    return nextId;
  }

  private _translateMiddle(element: ElementRef): void {
    element.nativeElement.style.opacity = 1;
    element.nativeElement.style.transitionDuration = this.speed + 'ms';
    element.nativeElement.style.transform = 'translate3d(0, 0, 0)';
  }

  private _translateRight(element: ElementRef): void {
    element.nativeElement.style.opacity = 0;
    element.nativeElement.style.transitionDuration = this.speed + 'ms';
    element.nativeElement.style.transform = 'translate3d(calc(100% + 10px), 0, 0)';
  }

  private _translateLeft(element: ElementRef): void {
    element.nativeElement.style.opacity = 0;
    element.nativeElement.style.transitionDuration = this.speed + 'ms';
    element.nativeElement.style.transform = 'translate3d(calc(-100% - 10px), 0, 0)';
  }

  private _transformRight(element: ElementRef): void {
    element.nativeElement.style.opacity = 0;
    element.nativeElement.style.transitionDuration = '0ms';
    element.nativeElement.style.transform = 'translate3d(calc(100% + 10px), 0, 0)';
  }

  private _transformLeft(element: ElementRef): void {
    element.nativeElement.style.opacity = 0;
    element.nativeElement.style.transitionDuration = '0ms';
    element.nativeElement.style.transform = 'translate3d(calc(-100% - 10px), 0, 0)';
  }
}

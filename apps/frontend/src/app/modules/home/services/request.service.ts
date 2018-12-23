import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../../../models/Post";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  listPosts(page: number): Observable<Post[]> {
    return this.http.get<Post[]>(environment.baseURL + '/posts/listPosts', {
      params: {
        page: String(page),
      }
    });
  }

  listFeaturedPosts(): Observable<Post[]> {
    /* tslint:disable */
    let posts = [
      { image: 'https://scontent-vie1-1.xx.fbcdn.net/v/t1.15752-9/36029258_1952348851463890_4236921547433967616_n.jpg?_nc_cat=0&oh=4cb548593b3aefe071ef87d296cd1e3f&oe=5BB2DB52', author: 'Szepi', id: 0, title: 'Lorem Ipsum 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://avatars1.githubusercontent.com/u/14909670?s=460&v=4', dateAgo: '30 napja', labels: [{ name: 'label1', color: '#a66bbe' }, { name: 'label1', color: '#61c437' }], type: 0 },
      { image: 'https://scontent-vie1-1.xx.fbcdn.net/v/t1.15752-9/36029258_1952348851463890_4236921547433967616_n.jpg?_nc_cat=0&oh=4cb548593b3aefe071ef87d296cd1e3f&oe=5BB2DB52', author: 'Szepi', id: 0, title: 'Lorem Ipsum 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://avatars1.githubusercontent.com/u/14909670?s=460&v=4', dateAgo: '30 napja', labels: [{ name: 'label1', color: '#a66bbe' }, { name: 'label1', color: '#61c437' }], type: 0 },
      { image: 'https://scontent-vie1-1.xx.fbcdn.net/v/t1.15752-9/36029258_1952348851463890_4236921547433967616_n.jpg?_nc_cat=0&oh=4cb548593b3aefe071ef87d296cd1e3f&oe=5BB2DB52', author: 'Szepi', id: 0, title: 'Lorem Ipsum 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://avatars1.githubusercontent.com/u/14909670?s=460&v=4', dateAgo: '30 napja', labels: [{ name: 'label1', color: '#a66bbe' }, { name: 'label1', color: '#61c437' }], type: 0 },
      { image: 'https://scontent-vie1-1.xx.fbcdn.net/v/t1.15752-9/36029258_1952348851463890_4236921547433967616_n.jpg?_nc_cat=0&oh=4cb548593b3aefe071ef87d296cd1e3f&oe=5BB2DB52', author: 'Szepi', id: 0, title: 'Lorem Ipsum 4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://avatars1.githubusercontent.com/u/14909670?s=460&v=4', dateAgo: '30 napja', labels: [{ name: 'label1', color: '#a66bbe' }, { name: 'label1', color: '#61c437' }], type: 0 },
      { image: 'https://scontent-vie1-1.xx.fbcdn.net/v/t1.15752-9/36029258_1952348851463890_4236921547433967616_n.jpg?_nc_cat=0&oh=4cb548593b3aefe071ef87d296cd1e3f&oe=5BB2DB52', author: 'Szepi', id: 0, title: 'Lorem Ipsum 5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://avatars1.githubusercontent.com/u/14909670?s=460&v=4', dateAgo: '30 napja', labels: [{ name: 'label1', color: '#a66bbe' }, { name: 'label1', color: '#61c437' }], type: 0 },
      { image: 'https://scontent-vie1-1.xx.fbcdn.net/v/t1.15752-9/36029258_1952348851463890_4236921547433967616_n.jpg?_nc_cat=0&oh=4cb548593b3aefe071ef87d296cd1e3f&oe=5BB2DB52', author: 'Szepi', id: 0, title: 'Lorem Ipsum 6', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://avatars1.githubusercontent.com/u/14909670?s=460&v=4', dateAgo: '30 napja', labels: [{ name: 'label1', color: '#a66bbe' }, { name: 'label1', color: '#61c437' }], type: 0 },
      { image: 'https://scontent-vie1-1.xx.fbcdn.net/v/t1.15752-9/36029258_1952348851463890_4236921547433967616_n.jpg?_nc_cat=0&oh=4cb548593b3aefe071ef87d296cd1e3f&oe=5BB2DB52', author: 'Szepi', id: 0, title: 'Lorem Ipsum 7', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://avatars1.githubusercontent.com/u/14909670?s=460&v=4', dateAgo: '30 napja', labels: [{ name: 'label1', color: '#a66bbe' }, { name: 'label1', color: '#61c437' }], type: 0 },
      { image: 'https://scontent-vie1-1.xx.fbcdn.net/v/t1.15752-9/36029258_1952348851463890_4236921547433967616_n.jpg?_nc_cat=0&oh=4cb548593b3aefe071ef87d296cd1e3f&oe=5BB2DB52', author: 'Szepi', id: 0, title: 'Lorem Ipsum 8', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://avatars1.githubusercontent.com/u/14909670?s=460&v=4', dateAgo: '30 napja', labels: [{ name: 'label1', color: '#a66bbe' }, { name: 'label1', color: '#61c437' }], type: 0 }
    ];
    /* tslint:enable */
    return Observable.create((obs) => {
      obs.next(posts);
    });
  }
}

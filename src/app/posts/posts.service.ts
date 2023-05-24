import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "./post.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class PostService {

    private _posts = new BehaviorSubject([])
    posts$ = this._posts.asObservable()

    constructor(private http: HttpClient) { }

    getPosts() {
        this.http.get<{ message: string; posts: Post[] }>('http://localhost:3000/api/posts').subscribe(data => { this._posts.next(data.posts) });
    }

    addPost(title, content) {
        const post: Post = { id: null, title: title, content: content }


        this.http.post('http://localhost:3000/api/posts', post).subscribe((data) => {
            console.log(data);
            this._posts.next([...this._posts.getValue(), post]);
        })
    }

}
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { Post } from "./post.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class PostService {

    private _posts = new BehaviorSubject([])
    posts$ = this._posts.asObservable()

    constructor(private http: HttpClient, private router: Router) { }

    getPost(id: string) {
        return this.http.get<{ message: string; post: Post }>('http://localhost:3000/api/posts/' + id);
    }

    getPosts() {
        this.http.get<{ message: string; posts: Post[] }>('http://localhost:3000/api/posts').subscribe(data => { this._posts.next(data.posts) });
    }

    addPost(title, content) {
        const post: Post = { _id: null, title: title, content: content }
        this.http.post<{ message: string, post: Post }>('http://localhost:3000/api/posts', post).subscribe((data) => {
            this._posts.next([...this._posts.getValue(), data.post]);
            this.router.navigate(['/'])
        })
    }

    updatePost(id: string, title: string, content: string) {
        const post: Post = { _id: id, title: title, content: content }
        this.http.put('http://localhost:3000/api/posts/' + id, post).subscribe((data) => {
            const updatedPosts = [...this._posts.getValue()]
            const index = updatedPosts.findIndex(p => p._id == id)
            updatedPosts[index] = { _id: id, title, content }
            this._posts.next(updatedPosts)
            this.router.navigate(['/'])
        })

    }

    deletePost(id: string) {
        this.http.delete('http://localhost:3000/api/posts/' + id).subscribe(() => {
            const posts: Post[] = this._posts.getValue();
            this._posts.next(posts.filter((post) => post._id != id));
        })

    }

}
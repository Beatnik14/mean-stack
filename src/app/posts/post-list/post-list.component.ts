import { Component, OnInit } from '@angular/core';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts$ = this.postsService.posts$
  constructor(private postsService: PostService){}
  ngOnInit(): void {
    this.postsService.getPosts()
  }
}

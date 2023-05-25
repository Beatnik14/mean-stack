import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { PostService } from '../posts.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private postId: string;
  post: Post;

  constructor(private postsService: PostService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.postId = paramMap.get('id');
        this.post = this.postsService.getPost(this.postId);
        console.log(this.post)

      } else {
        this.mode = 'create';
        this.postId = null;
      }
      paramMap.has('id')
    })
  }
  onAddPost(form: NgForm) {
    if (this.mode == 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(this.postId, form.value.title, form.value.content);
    }

    form.resetForm()
  }

}

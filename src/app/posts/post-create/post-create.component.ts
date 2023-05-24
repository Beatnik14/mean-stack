import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {



  enteredTitle = ''
  enteredContent = ''

  constructor(private postsService: PostService) { }
  onAddPost(form: NgForm) {
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm()
  }

}

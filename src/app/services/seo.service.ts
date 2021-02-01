// Generate the data and metatags for things like twitter cards dynamically when the user goes to a new route in an app
// Create standard twitter card
import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  // angular has a couple services to update the title and metatags in a head of document. For this purpose we inject title and meta
  constructor(private title: Title, private meta: Meta, private router: Router) { }

  // generateTag takes an object as its argument
  generateTag({ title='', description='', image='' }) {
    // title will come from firestore document
    this.title.setTitle(title);
    this.meta.addTags([
      // Open Graph
      { name: 'og:url', content: `http://localhost:4200${this.router.url}`},
      { name: 'og:title', content: title },
      { name: 'og:description', content: description },
      { name: 'og:image', content: image },
      // Twitter Card
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@fireship_dev' }
    ]);

  }
}

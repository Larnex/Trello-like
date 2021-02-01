import { Component, OnInit } from '@angular/core';
// ActivatedRoute allows to get query parameters or the url parameter from a route and subscribe to them as an observable or get their snapshop at any given point of time
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap } from 'rxjs/operators';
import { SeoService } from 'src/app/services/seo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  customerId!: string;
  customer!: Observable<any>;

  constructor(private route: ActivatedRoute, private seo: SeoService, private db: AngularFirestore) { }

  ngOnInit(): void {
    // get customer id
    this.customerId = this.route.snapshot.paramMap.get('id')!;

    this.customer = this.db.collection('customers').doc<any>(this.customerId).valueChanges().pipe(
      tap(cust =>
        this.seo.generateTag({
          title: cust.name,
          description: cust.bio,
          image: cust.image,
        })
        )
    )
  }

}

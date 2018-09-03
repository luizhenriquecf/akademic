import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'app/models/activity.interface';
import { ActivityService } from 'app/services/activity.service';
import { Subscription } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'aka-validate-activity',
  templateUrl: './validate-activity.component.html',
  styleUrls: ['./validate-activity.component.css']
})
export class ValidateActivityComponent implements OnInit, OnDestroy {

  title = 'Validação de Atividade';
  activity: Activity;
  uidActivity: string;
  inscricao: Subscription;
  attachments = [];
  images = [];

  constructor(
    private _route: ActivatedRoute,
    private _actService: ActivityService,
    private _storage: AngularFireStorage,
    private _router: Router
  ) { }

  ngOnInit() {
    this.inscricao = this._route.paramMap.subscribe(params => {
      this.uidActivity = params.get('id');
      this._actService.getActivityById(this.uidActivity)
        .subscribe(response => {
          this.activity = response;
          response.attachment.forEach(element => {
            // console.log('element:' + element)
            this._storage.ref(element.url).getDownloadURL().
              subscribe(res => {
                const data = { name: element.name, url: res };
                this.attachments.push(data)
                // , console.log(data)
              });
          });
        });
    });

    this.images.push({ source: 'assets/img/akademic-name-black.png', alt: 'Description for Image 1', title: 'Title 1' });
    this.images.push({ source: 'assets/img/default-avatar.png', alt: 'Description for Image 2', title: 'Title 2' });
    this.images.push({ source: 'assets/img/login.png', alt: 'Description for Image 3', title: 'Title 3' });
    this.images.push({ source: 'assets/img/sidebar.jpg', alt: 'Description for Image 4', title: 'Title 4' });
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  toApprove() {
    // status 'A' (Aproved)
    this.activity.status = 'A';
    this._actService.updateActivity(this.uidActivity, this.activity, 'aprovada');
    this._router.navigate(['/dashboard']);
  }

  toReprove() {
    // status 'R' (Reproved)
    this.activity.status = 'R';
    this._actService.updateActivity(this.uidActivity, this.activity, 'reprovada');
    this._router.navigate(['/dashboard']);
  }

}

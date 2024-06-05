import {Component} from '@angular/core';
import {ArticleService} from "../../shared/services/article.service";
import {ArticleType} from "../../../types/article.type";
import {OwlOptions} from "ngx-owl-carousel-o";
import {FormBuilder, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {RequestModalComponent} from "../../shared/components/request-modal/request-modal.component";
import {RequestService} from "../../shared/services/request.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  articles: ArticleType[] = [];

  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 26,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 26,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
    },
    nav: false
  }

  reviews = [
    {
      name: 'Станислав',
      image: 'review1.png',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.'
    },
    {
      name: 'Алёна',
      image: 'review2.png',
      text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.'
    },
    {
      name: 'Мария',
      image: 'review3.png',
      text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!'
    },
    {
      name: 'Аделина',
      image: 'review4.jpg',
      text: 'Сервис супер! Второй раз обращаюсь, услуги оказаны в лучшем виде. Как и в прошлый раз, превзошли все мои ожидания! Спасибо вам за хорошую работу!'
    },
    {
      name: 'Яника',
      image: 'review5.jpg',
      text: 'Спасибо большое за мой обновлённый сайт! Сервис просто на 5+: быстро, удобно, недорого. Что ещё нужно клиенту для счастья?'
    },
    {
      name: 'Марина',
      image: 'review6.jpg',
      text: 'Для меня всегда важным аспектом было возможно всё решить оперативно и онлайн. Ещё никогда не встречала такого крутова сервиса!'
    },
  ];

  constructor(private articleService: ArticleService, private fb: FormBuilder, private dialog: MatDialog, private router: Router, private requestService: RequestService) {
  }

  ngOnInit() {
    this.articleService.getPopularArticles()
      .subscribe((data: ArticleType[]) => {
        this.articles = data;
      })
  }

  openModalWithSelect(option: string) {
    this.requestService.setShowSelectElement(true);
    this.requestService.setSelectedOption(option);
    const dialogRef = this.dialog.open(RequestModalComponent);
    dialogRef.componentInstance.selectedOption = option;

    dialogRef.afterClosed().subscribe(result => {
      return;
    });
  }

}

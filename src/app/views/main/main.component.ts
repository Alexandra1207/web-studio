import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
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

  // @ViewChild('selectElement', {static: false}) selectElement: ElementRef = new ElementRef(null);
  // @ViewChild('popup') popup!: TemplateRef<ElementRef>;
  dialogRef: MatDialogRef<any> | null = null;
  showSuccessMessage: boolean = false;

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

  requestForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    // service: [null, Validators.required],
    service: ['Сервис не указан'],
  })


  constructor(private articleService: ArticleService, private fb: FormBuilder, private dialog: MatDialog, private router: Router, private requestService: RequestService) {
  }

  ngOnInit() {
    this.articleService.getPopularArticles()
      .subscribe((data: ArticleType[]) => {
        this.articles = data;
      })

  }

  onSelectChange(event: any) {
    // Расширяем select при изменении выбранного значения
    event.target.style.width = event.target.options[event.target.selectedIndex].scrollWidth + 'px';
  }

  selectOption(optionText: string) {
    // this.dialogRef = this.dialog.open(this.popup); // Присваиваем dialogRef значение при открытии модального окна
    // this.dialogRef.afterOpened().subscribe(() => {
    //   const select = this.selectElement.nativeElement as HTMLSelectElement;
    //   const index = Array.from(select.options).findIndex(option => option.innerText === optionText);
    //   select.selectedIndex = index === -1 ? 0 : index;
    // });
  }
  updateService(value: string) {
      this.requestForm.patchValue({ service: value } as { service: string | null });
  }

  openModalWithSelect(option: string) {
    this.requestService.setShowSelectElement(true);
    this.requestService.setSelectedOption(option);
    const dialogRef = this.dialog.open(RequestModalComponent);
    dialogRef.componentInstance.selectedOption = option;
    // console.log(dialogRef.componentInstance.selectedOption);

    dialogRef.afterClosed().subscribe(result => {
      return;
    });
  }

  // openModalWithSelect(option: string) {
  //   this.requestService.setShowSelectElement(true);
  //   this.dataService.setSelectedOption(option);
  //   const dialogRef = this.dialog.open(RequestModalComponent);
  // }
  // openModalWithSelect() {
  //   this.requestService.setShowSelectElement(true);
  //   // открываем модальное окно
  //   const dialogRef = this.dialog.open(RequestModalComponent);
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     // console.log(`Dialog result: ${result}`);
  //     return;
  //   });
  // }

  // selectOption(optionText: string) {
  //   this.dialogRef = this.dialog.open(this.popup);
  //   this.dialogRef.afterOpened().subscribe(() => {
  //     const select = this.selectElement.nativeElement as HTMLSelectElement;
  //     const index = Array.from(select.options).findIndex(option => option.innerText === optionText);
  //     select.selectedIndex = index === -1 ? 0 : index;
  //   });
  // }

  // selectOption(optionText: string) {
  //   this.dialog.open(this.popup).afterOpened().subscribe(() => {
  //     const select = this.selectElement.nativeElement as HTMLSelectElement;
  //     const index = Array.from(select.options).findIndex(option => option.innerText === optionText);
  //     select.selectedIndex = index === -1 ? 0 : index;
  //   });
  //   // this.dialog.open(this.popup);
  //   // const select = this.selectElement.nativeElement as HTMLSelectElement;
  //   // const index = Array.from(select.options).findIndex(option => option.innerText === optionText);
  //   // select.selectedIndex = index === -1 ? 0 : index;
  // }

  postRequest() {
    if (this.requestForm.valid) {
      console.log(this.requestForm.value);
      this.showSuccessMessage = true;
    }
  }

  closePopup() {
    this.dialogRef?.close();
    this.router.navigate(['/']);
  }
}

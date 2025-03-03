
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../core/interfaces/categories/icategory';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss',
})
export class CategoryDetailsComponent implements OnInit {
  categoryID!: string;
  categoryDetail: ICategory | null = null;
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CategoriesService = inject(CategoriesService);

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((param) => {
      this.categoryID = param.get('c_id')!;
      this.loadCategoryDetails();
    });
  }

  loadCategoryDetails(): void {
    this._CategoriesService.getCpecificCategory(this.categoryID).subscribe({
      next: (res) => {
        this.categoryDetail = res.data;
      },
      error: (err) => {
        console.error('Error fetching category details:', err);
      },
    });
  }
}

















// import { Component, inject } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CategoriesService } from '../../core/services/categories/categories.service';
// import { ToastrService } from 'ngx-toastr';
// import { ICategory } from '../../core/interfaces/categories/icategory';

// @Component({
//   selector: 'app-category-details',
//   imports: [],
//   templateUrl: './category-details.component.html',
//   styleUrl: './category-details.component.scss',
// })
// export class CategoryDetailsComponent {
//   categoryID!: string;
//   categorydetail: ICategory | null = null;
//   private readonly _ActivatedRoute = inject(ActivatedRoute);
//   constructor(
//     private _CategoriesService: CategoriesService,
//     private toastr: ToastrService
//   ) {}

//   ngOnInit(): void {
//     this._ActivatedRoute.paramMap.subscribe({
//       next: (param) => {
//         this.categoryID = param.get('c_id')!;
//       },
//     });

//     this._CategoriesService.getCpecificCategory(this.categoryID).subscribe({
//       next: (res) => {
//         this.categorydetail = res.data;
//       },
//       error: (err) => {},
//     });
//   }
// }

import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../core/interfaces/categories/icategory';
import { AuthService } from '../../core/services/authentication/auth.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  categoriesData!: ICategory[];
   categorysub!: Subscription;
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _AuthService = inject(AuthService);

  ngOnInit(): void {
    console.log(this._AuthService.userInfo);
    this.categorysub = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesData = res.data;
        console.log(this.categoriesData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.categorysub?.unsubscribe();
  }
}

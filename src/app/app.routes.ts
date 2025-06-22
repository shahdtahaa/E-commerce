import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AuthComponent } from './layouts/auth-layout/auth/auth.component';
import { MainComponent } from './layouts/main-layout/main/main.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // sebt el path fady ashan kdakda hayemshy sequential ashan da array
  {path: '',component: AuthComponent,children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'Login Page' },
      { path: 'register', loadComponent: () =>
          import('./pages/register/register.component').then(
            (classes) => classes.RegisterComponent), title: 'Register Page',
      },
      { path: 'forgotPasswords', loadComponent: () =>
        import('./pages/forgot-password/forgot-password.component').then(
          (classes) => classes.ForgotPasswordComponent), title: 'Forgot password',
    },
    { path: 'verifyResetCode', loadComponent: () =>
      import('./pages/verify-reset-code/verify-reset-code.component').then(
        (classes) => classes.VerifyResetCodeComponent), title: 'Verify Code',
  },
  { path: 'resetPassword', loadComponent: () =>
    import('./pages/reset-password/reset-password.component').then(
      (classes) => classes.ResetPasswordComponent), title: 'Verify Code',
},

    ],
  },
  {
    path: '',component: MainComponent , canActivate:[authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home Page' },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (classes) => classes.ProductsComponent
          ),
        title: 'Products',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then(
            (classes) => classes.CategoriesComponent
          ),

        title: 'Categories',
      },

      {
        path: 'categories/:c_id',
        loadComponent: () =>
          import('./pages/category-details/category-details.component').then(
            (classes) => classes.CategoryDetailsComponent
          ),

        title: 'Categories',
      },


      {
        path: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then(
            (classes) => classes.BrandsComponent
          ),
        title: 'Brands',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import(
            './pages/wishlist/wishlist/wishlist.component'
          ).then((classes) => classes.WishlistComponent),
        title: 'wishlist',
      },

      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then(
            (classes) => classes.CartComponent
          ),
        title: 'Cart',
      },
      {
        path: 'checkout/:c_id',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then(
            (classes) => classes.CheckoutComponent
          ),
        title: 'Cart',
      },
      {
        path: 'product-Details/:p_id',
        loadComponent: () =>
          import(
            './pages/productDetails/product-details/product-details.component'
          ).then((classes) => classes.ProductDetailsComponent),
        title: 'Details',
      },

      {
        path: 'brands/:brand_id',
        loadComponent: () =>
          import('./pages/specific-brand/specific-brand.component').then(
            (classes) => classes.SpecificBrandComponent
          ),
        title: 'Brands',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./pages/allorders/allorders.component').then(
            (classes) => classes.AllordersComponent
          ),
        title: 'Brands',
      },


      { path: '**', component: NotfoundComponent, title: 'Error404' },
      //  momken ahot elnotefound bara bas hayeba men gheri nav bar
      //  w aady ahoto hena la2eno mesh hayaady aleha gheir ama y3ady aala kol elablaha
    ],
  },
];




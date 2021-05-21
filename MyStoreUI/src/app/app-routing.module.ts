import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../app/common/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Shared/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./Shared/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./Shared/signup/signup.module').then( m => m.SignupPageModule)
  }, 
  {
    path: 'welcome-slides',
    loadChildren: () => import('./welcome-slides/welcome-slides.module').then( m => m.WelcomeSlidesPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'service-provider',
    loadChildren: () => import('./service-provider/service-provider.module').then( m => m.ServiceProviderPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'product-provider',
    loadChildren: () => import('./product-provider/product-provider.module').then( m => m.ProductProviderPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'introduction',
    loadChildren: () => import('./Shared/introduction/introduction.module').then( m => m.IntroductionPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin-product-provider',
    loadChildren: () => import('./admin-product-provider/admin-product-provider.module').then( m => m.AdminProductProviderPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin-service-provider',
    loadChildren: () => import('./admin-service-provider/admin-service-provider.module').then( m => m.AdminServiceProviderPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'send-notification',
    loadChildren: () => import('./send-notification/send-notification.module').then( m => m.SendNotificationPageModule),
    canActivate: [AuthGuardService]
  },
 
  {
    path: 'store-orders',
    loadChildren: () => import('./store-orders/store-orders.module').then( m => m.StoreOrdersPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'service-orders',
    loadChildren: () => import('./service-orders/service-orders.module').then( m => m.ServiceOrdersPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'delivery-management',
    loadChildren: () => import('./delivery-management/delivery-management.module').then( m => m.DeliveryManagementPageModule)
    // canActivate: [AuthGuardService]
  }






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

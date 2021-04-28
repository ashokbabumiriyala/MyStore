import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./welcome-slides/welcome-slides.module').then( m => m.WelcomeSlidesPageModule)
  },
  {
    path: 'service-provider',
    loadChildren: () => import('./service-provider/service-provider.module').then( m => m.ServiceProviderPageModule)
  },
  {
    path: 'product-provider',
    loadChildren: () => import('./product-provider/product-provider.module').then( m => m.ProductProviderPageModule)
  },
  {
    path: 'introduction',
    loadChildren: () => import('./Shared/introduction/introduction.module').then( m => m.IntroductionPageModule)
  },  {
    path: 'admin-product-provider',
    loadChildren: () => import('./admin-product-provider/admin-product-provider.module').then( m => m.AdminProductProviderPageModule)
  },
  {
    path: 'admin-service-provider',
    loadChildren: () => import('./admin-service-provider/admin-service-provider.module').then( m => m.AdminServiceProviderPageModule)
  },
  {
    path: 'send-notification',
    loadChildren: () => import('./send-notification/send-notification.module').then( m => m.SendNotificationPageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./account/auth.module").then((m) => m.AuthModule),
  },

  {
    path: "",
    loadChildren: () => import("./pages/home/home.module").then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },

  {
    path: "**",
    loadChildren: () => import("./pages/home/home.module").then((m) => m.HomeModule),
    canActivate: [AuthGuard],

  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

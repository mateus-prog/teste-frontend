import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './components/list';
import { AddComponent } from './components/add';

const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'add', component: AddComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TimeEntriesRoutingModule { }
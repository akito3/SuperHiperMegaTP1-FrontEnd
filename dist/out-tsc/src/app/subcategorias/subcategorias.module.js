var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SubCategoriasRoutes } from './categorias.routing';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ListarSubcategoriasComponent } from './listar-subcategorias/listar-subcategorias.component';
import { CrearSubcategoriasComponent } from './crear-subcategorias/crear-subcategorias.component';
import { EditarSubcategoriasComponent } from './editar-subcategorias/editar-subcategorias.component';
var SubCategoriasModule = /** @class */ (function () {
    function SubCategoriasModule() {
    }
    SubCategoriasModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule.forChild(SubCategoriasRoutes),
                FormsModule,
                ReactiveFormsModule,
                MaterialModule
            ],
            declarations: [ListarSubcategoriasComponent, CrearSubcategoriasComponent, EditarSubcategoriasComponent]
        })
    ], SubCategoriasModule);
    return SubCategoriasModule;
}());
export { SubCategoriasModule };
//# sourceMappingURL=subcategorias.module.js.map
import { ExtendedFormsComponent } from './extendedforms/extendedforms.component';
import { RegularFormsComponent } from './regularforms/regularforms.component';
import { ValidationFormsComponent } from './validationforms/validationforms.component';
import { WizardComponent } from './wizard/wizard.component';
export var FormsRoutes = [
    {
        path: '',
        children: [{
                path: 'regular',
                component: RegularFormsComponent
            }]
    }, {
        path: '',
        children: [{
                path: 'extended',
                component: ExtendedFormsComponent
            }]
    }, {
        path: '',
        children: [{
                path: 'validation',
                component: ValidationFormsComponent
            }]
    }, {
        path: '',
        children: [{
                path: 'wizard',
                component: WizardComponent
            }]
    }
];
//# sourceMappingURL=forms.routing.js.map
import { FullScreenMapsComponent } from './fullscreenmap/fullscreenmap.component';
import { GoogleMapsComponent } from './googlemaps/googlemaps.component';
import { VectorMapsComponent } from './vectormaps/vectormaps.component';
export var MapsRoutes = [
    {
        path: '',
        children: [{
                path: 'fullscreen',
                component: FullScreenMapsComponent
            }]
    }, {
        path: '',
        children: [{
                path: 'google',
                component: GoogleMapsComponent
            }]
    }, {
        path: '',
        children: [{
                path: 'vector',
                component: VectorMapsComponent
            }]
    }
];
//# sourceMappingURL=maps.routing.js.map
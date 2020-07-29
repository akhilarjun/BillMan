import {$Router} from './routenow/routenow';
import './assets/styles/index.scss';
import './assets/styles/common.scss';
import './assets/styles/home.scss';
import './assets/styles/invoice.scss';
import { getResponse } from './test/invoice_stump';
import { INVOICES } from './renderers/invoice';

$Router.config([
    {path: 'home', templateUrl: 'partial/home.html'},
    {path: 'invoice', templateUrl: 'partial/invoice.html'},
    {path: 'settings', templateUrl: 'partial/settings.html'},
    {path: 'notifications', templateUrl: 'partial/notifications.html'},
    {otherwise:'home'}
], {
    activateLinks: false,
    afterRouteChange: (ap) => {
        let routerLinks = Array.from(document.querySelectorAll('a[r-href]'));
        routerLinks.forEach(link => {
            if (link.getAttribute('r-href') === ap) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        switch (ap) {
            case 'invoice':
                let resp = getResponse();
                INVOICES.renderList(resp);
                break;
            default:
                break;
        }
    }
});
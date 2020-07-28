import  {$Router} from './routenow/routenow';
import './assets/styles/index.scss';
import './assets/styles/common.scss';
import './assets/styles/home.scss';
import './assets/styles/invoice.scss';

$Router.config([
    {path: 'home', templateUrl: 'partial/home.html'},
    {path: 'invoice', templateUrl: 'partial/invoice.html'},
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
    }
});
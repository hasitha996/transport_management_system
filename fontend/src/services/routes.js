
import {User,Home,Bus} from '../views';

export const routes = [
  {
    name: 'Home',
    pathURL: '/home',
    componentName: Home,
  },
  {
    name: 'Bus',
    pathURL: '/bus',
    componentName: Bus,
  },
  {
    name: 'User',
    pathURL: '/user',
    componentName: User,
  }, 
];
export default routes;


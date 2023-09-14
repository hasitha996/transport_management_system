
import {User,Home,Bus,BusRoute} from '../views';

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
    name: 'Route',
    pathURL: '/bus_route',
    componentName: BusRoute,
  },
  {
    name: 'User',
    pathURL: '/user',
    componentName: User,
  }, 
];
export default routes;


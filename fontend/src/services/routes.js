
import {User,Home,Bus,BusRoute,Employee,Schedule} from '../views';

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
    name: 'Employee',
    pathURL: '/employee',
    componentName: Employee,
  },
  {
    name: 'Schedule',
    pathURL: '/schedule',
    componentName: Schedule,
  },
  {
    name: 'User',
    pathURL: '/user',
    componentName: User,
    adminOnly: true,
  }, 
];
export default routes;


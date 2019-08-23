export interface Route {
    name: string;
    url: string;
    render: (key: string) => any;
}
interface RouteUpdate {
    key: string;
    fromRoute?: Route;
    toRoute: Route;
}
declare class Router {
    private appRoutes;
    private baseUrl;
    private listeners;
    constructor(routes: Route[], baseUrl?: string);
    readonly base: string;
    readonly currentRoute: Route | undefined;
    subscribe(fn: (update: RouteUpdate) => void): void;
    push(location: string): void;
    guardPath(path: string): string;
    private listenToPopState;
    private publishChange;
}
export default Router;

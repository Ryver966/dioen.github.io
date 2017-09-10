class EventHandlersService {
    constructor() {}

    setActiveClass(event) {
        event.className = event.className + ' active';
    }

    removeActiveClass(event) {
        event.className = event.className.replace(' active', '');
    }
}

export default EventHandlersService;
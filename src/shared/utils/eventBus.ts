import mitt from 'mitt';

type Events = {
    'qr-code': string; // QR code
    'whatsapp-status': string; // WhatsApp connection status
};

class StatefulEventBus {
    private emitter = mitt<Events>();
    private lastEvents: Partial<Events> = {};

    emit<Key extends keyof Events>(type: Key, event: Events[Key]) {
        this.lastEvents[type] = event;
        this.emitter.emit(type, event);
    }

    on<Key extends keyof Events>(type: Key, handler: (event: Events[Key]) => void) {
        // If there is a buffered event, call the handler immediately
        if (this.lastEvents[type]) {
            handler(this.lastEvents[type]!);
        }
        // Register for future events
        this.emitter.on(type, handler);
    }

    off<Key extends keyof Events>(type: Key, handler: (event: Events[Key]) => void) {
        this.emitter.off(type, handler);
    }
}

const eventBus = new StatefulEventBus();

export default eventBus;

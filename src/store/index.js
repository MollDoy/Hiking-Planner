import { createStore } from 'vuex'

export default createStore({
    state: {
        events: [
            {
            id: 1,
            placeId: 105,
            tourists: 12,
            participate: false,
            start: new Date("2025-09-15T10:00:00"),
            end: new Date("2025-09-15T17:00:00")
            }, // устаревший, для проверки удаления
            {
            id: 2,
            placeId: 107,
            tourists: 14,
            participate: false,
            start: new Date("2025-09-21T10:00:00"),
            end: new Date("2025-09-21T22:00:00")
            }
        ],
        nextEventId: 3
    },
    actions: {
        addEvent({commit}, event) {
            if (!event) return;
            commit("addEventToArray", event);
        },
        subscribe({commit, state}, eventId) {
            const event = state.events.find(e => e.id === eventId);
            if (event.participate) {return}
            else commit("subscribeOnEvent", event)
        },
        unsubscribe({commit, state}, eventId) {
            const event = state.events.find(e => e.id === eventId);
            if (!event.participate) {return}
            else commit("unsubscribeFromEvent", event)
        },
        cleanupEvents({ commit }) {
            const now = new Date();
            commit("removeExpiredEvents", now);
        }
    },
    getters: {

    },
    mutations: {
        addEventToArray(state, event) {
            state.events.push({...event, id: state.nextEventId})
            state.nextEventId++
        },
        subscribeOnEvent(state, event) {
            event.tourists++;
            event.participate = true;
        },
        unsubscribeFromEvent(state, event) {
            event.tourists--;
            if (event.tourists === 0) {
                state.events = state.events.filter(e => e.id !== event.id)
            } else {event.participate = false;}
        },
        removeExpiredEvents(state, now) {
            state.events = state.events.filter(e => e.end > now);
        }
    }
})
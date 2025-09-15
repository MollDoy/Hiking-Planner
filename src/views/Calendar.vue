<template>
    <v-container>
        <vue-cal
        :time="true"
        default-view="month"
        :events="calendarEvents"
        :week-start="1"
        :locale="$i18n.locale">
            <template v-slot:event="{ event, view }">
                <v-btn 
                variant="outlined" 
                class="clickable-event" 
                @click.stop="onEventClick(event.id)"
                :class="event.participate ? 'event-green' : 'event-gray'">
                    <template v-if="(view && view.id && view.id === 'week') || view === 'week'">
                        {{ event.tourists }} <v-icon small class="ml-1">mdi-account</v-icon>
                    </template>
                    <template v-else>
                        {{ event.placeName }} ( {{ event.tourists }}<v-icon small class="ml-1">mdi-account</v-icon>)
                    </template>
                </v-btn>
            </template>
        </vue-cal>

        <v-dialog v-model="showEventDialog" max-width="400px">
                <HikingPlaceCard
                v-if="placeOfSelectedEvent"
                :place="placeOfSelectedEvent">

                    <template #extra-info>
                        <p style="margin-top: 10px;">{{ $t("startHike") }}: {{ formattedDate(selectedEvent.start) }}</p> 
                        <p>{{ $t("endHike") }}: {{ formattedDate(selectedEvent.end) }}</p>
                        <br />
                        {{ $t("tourists") }}: {{ selectedEvent.tourists }} <v-icon small>mdi-account</v-icon>
                        <p v-if="selectedEvent.participate" style="color: green">
                            <b>{{ $t("registered") }}</b>
                        </p>
                    </template>

                    <template #actions>
                        <v-btn color="green" @click="subscribe(selectedEvent.id)">{{ $t("register") }}</v-btn>
                        <v-btn color="red" @click="unsubscribe(selectedEvent.id)">{{ $t("unregister") }}</v-btn>
                        <v-spacer />
                        <v-btn icon @click="showEventDialog = false"> 
                            <v-icon>mdi-close</v-icon> 
                        </v-btn>
                    </template>

                </HikingPlaceCard>
            <!-- </v-card> -->
        </v-dialog>
    </v-container>
</template>

<script>
import { mapState } from "vuex";
import VueCal from "Vue-cal"
import "vue-cal/dist/vuecal.css"

import HikingPlaceCard from "@/components/HikingPlaceCard.vue";
import cities from "@/assets/cities.json"

export default {
    components: { VueCal, HikingPlaceCard },
    data() {
        return {
            selectedEvent: null,
            showEventDialog: false,
            placeOfSelectedEvent: null,

            cities,
            placesMap: this.createPlacesMap(cities)
        }
    },
    methods: {
        createPlacesMap(cities) { // (Оптимизация) - заранее один раз создаём объект Map с коллекцией "ключ (id места)" -> "значение (место)"
            const map = new Map();           
            for (const city of Object.values(cities)) {  
                for (const place of city.places) {     
                    map.set(place.id, place);
                }
            }
            return map;
        },
        onEventClick (eventId) {
            this.selectedEvent = this.events.find(e => e.id === eventId);

            /*for (const city of Object.values(cities)) {
                const foundPlace = city.places.find(p => p.id === this.selectedEvent.placeId);
                if (foundPlace) {
                    this.placeOfSelectedEvent = foundPlace;
                    break;
                }
            }*/
            this.placeOfSelectedEvent = this.placesMap.get(this.selectedEvent.placeId) // (Оптимизация) - достаём место по id в уже заготовленной коллекции
            this.showEventDialog = true;
        },
        subscribe(eventId) {
            const eventToSubscribe = this.events.find(e => e.id === eventId);

            const startDate = new Date(eventToSubscribe.start);
            const endDate = new Date(eventToSubscribe.end);

            // Поиск других ивентов на это время
            const hasConflictEvent = this.events.some(ev => {
                if (!ev.participate || ev.id === eventId) return false; 
                const evStart = new Date(ev.start);
                const evEnd = new Date(ev.end);
                return startDate < evEnd && endDate > evStart;
            });

            if (hasConflictEvent) {
                alert(this.$t("conflictEvent"));
                return;
            }

            this.$store.dispatch("subscribe", eventId);
        },
        unsubscribe(eventId) {
            this.$store.dispatch("unsubscribe", eventId)
            const updatedEvent = this.events.find(e => e.id === eventId);
            if (!updatedEvent) {
                this.showEventDialog = false;
            }
        },
        formattedDate(date) {
            return date ? new Date(date).toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' }) : '';
        },
    },
    computed: {
        ...mapState(["events"]),
        calendarEvents() {
            return this.events.map(e => {
                /*let placeName = '';
                for (const city of Object.values(cities)) {
                    const place = city.places.find(p => p.id === e.placeId);
                    if (place) {
                        placeName = place.name[this.$i18n.locale];
                        break;
                    }
                }*/
                const place = this.placesMap.get(e.placeId); // (Оптимизация) - достаём место по id в уже заготовленной коллекции
                return {
                    start: e.start,
                    end: e.end,
                    placeName: place.name[this.$i18n.locale],

                    tourists: e.tourists,
                    id: e.id,
                    participate: e.participate,
                }
            })
        },
    },
    created() {
        this.$store.dispatch("cleanupEvents");
    },
};
</script>

<style scoped>
.vuecal--years-view, .vuecal--year-view, .vuecal--month-view {
    height: 500px
}
.clickable-event {
    margin-top: 5px;
    cursor: pointer;
    font-size: 12px;
}
.event-green {
    background-color: green !important;
    color: white !important;
}
.event-gray {
    background-color: gray !important;
    color: white !important;
}
</style>
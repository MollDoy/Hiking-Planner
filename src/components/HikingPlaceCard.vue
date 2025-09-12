<template>
    <v-card class="d-flex flex-column" style="min-width: 0">
        <v-img v-bind:src="place.image" max-height="350px" cover />
        <v-card-title style="text-align: center">{{ place.name[$i18n.locale] }}</v-card-title>
        <v-card-subtitle> {{ place.location[$i18n.locale] }}</v-card-subtitle>
        <v-card-text>
            {{ place.description[$i18n.locale] }} <br />
            {{ $t("length") }}: {{ place.length[$i18n.locale] }} <br />
            {{ $t("difficulty") }}: {{ place.difficulty[$i18n.locale] }}

            <slot name="extra-info"></slot>

            <!-- НАДО ДОБАВИТЬ ПРОВЕРКУ И ВОЗМОЖНОСТЬ ЗАПИСАТЬСЯ НА СУЩЕСТВУЮЩИЕ ИВЕНТЫ
            <br><br>
            <v-icon small>mdi-account</v-icon> {{ place.tourists }} туристов -->
        </v-card-text>
        <v-card-actions>
            <slot name="actions">
                <v-btn @click="addToCalendar(place.id)"> {{ $t("plan") }}</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="show = !show">
                </v-btn>
            </slot>
        </v-card-actions>
        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>
                <v-text-field
                v-model="start"
                :label="$t('startHike')"
                type="datetime-local"
                ></v-text-field>

                <v-text-field
                v-model="end"
                :label="$t('endHike')"
                type="datetime-local"
                ></v-text-field>
            </div>
        </v-expand-transition>
    </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
    props: {
        place: {type: Object, required: true}
    },
    data() {
        return {
            //eventId: 2,
            citySelected: null,
            show: false,
            start: null,
            end: null
        }
    },
    methods: {
        ...mapActions(["addEvent"]),

        selectCity(city) {
            this.citySelected = city;
            if (this.show) {this.show = false};
        },
        addToCalendar(placeId) {
            if (!this.show) {
                this.show = true;
            } else {
                if (!this.start || !this.end) return;
                this.addEvent({
                    //id: this.eventId++,
                    //title: name,
                    placeId,
                    tourists: 1,
                    participate: true,
                    start: new Date(this.start),
                    end: new Date(this.end),
                });
                this.start = null;
                this.end = null;
                alert(this.$t("addedToCalendar") + this.place.name[this.$i18n.locale])
            }
        }
    },
}
</script>
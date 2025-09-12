<template>
  <v-container fluid>
    <v-row>
        <!-- <v-col cols="2" style="min-width: 140px">
            <v-list>
                <v-list-item
                v-for="city in cities"
                :key="city.id"
                @click="selectCity(city)">
                    <v-list-item-title style="text-align: center;">{{ city.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-col> -->
        <v-col xl="1" lg="2" sm="12">
            <v-menu transition="slide-y-transition">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" block>
                        {{ citySelected ? citySelected.title[$i18n.locale] : $t("chooseCity") }}
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="city in cities" :key="city.id" @click="selectCity(city)" style="text-align: center;">
                        <v-list-item-title> {{ city.title[$i18n.locale] }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-col>
        <v-col xl="3" offset-xl="3" lg="3" offset-lg="2" sm="9" offset-sm="0">
            <v-text-field 
            :label="$t('enterCity')" 
            v-model="enterCity" 
            v-on:keyup.enter="selectCity(enterCity)" 
            hide-details="auto"
            :error-messages="cityError ? $t('cityNotFound') : ''"></v-text-field>
        </v-col>
        <v-col xl="1" lg="1" sm="3">
            <v-btn v-on:click="selectCity(enterCity)" block min-height="58px"> {{ $t("enter") }} </v-btn>
        </v-col>
    </v-row>
    <v-row>
        <v-col xl="8" offset-xl="2" lg="8" offset-lg="2" md="9" offset-md="1" sm="10" offset-sm="0">
            <v-row justify="center">
                <v-col 
                v-if="citySelected" 
                v-for="place in citySelected.places" 
                :key="place.id" 
                sm="12" 
                offset-sm="2" 
                md="6" 
                offset-md="0" 
                lg="4" 
                offset-lg="0"
                xl="3"
                offset-xl="0">
                    <HikingPlaceCard v-bind:place="place" />
                </v-col>
                <v-col v-else xl="6" offset-xl="0" lg="6" offset-lg="0" sm="12" offset-sm="2">
                    <v-card variant="outlined" class="pa-4" style="text-align: center;">
                        <h3> {{ $t("nothingSelected") }}</h3> <br />
                        <p> {{ $t("tryInputOrSelect") }}</p>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HikingPlaceCard from "@/components/HikingPlaceCard.vue";
import cities from "../assets/cities.json"

export default {
    components: {
        HikingPlaceCard
    },
    data() {
        return {
            cities,
            citySelected: null,
            enterCity: "",
            cityError: false
        }
    },
    methods: {
        selectCity(city) {
            if (typeof city === "string") {
                // поиск города в каждой локали
                const foundCity = Object.values(this.cities).find(c => Object.values(c.title).some(title => title.toLowerCase() === city.toLowerCase()));
                if (foundCity) {
                    this.cityError = false;
                    this.citySelected = foundCity;
                } else {
                    this.cityError = true
                }
                this.enterCity = "";
            } else {this.citySelected = city;}
        }
    },
    /*computed: {
        cities() {
            return this.$i18n.messages[this.$i18n.locale].cities
        }
    }*/
}
</script>
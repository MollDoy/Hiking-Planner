<template>
    <v-container fluid>
        <v-row class="mb-4" align="center">
            <v-col 
            cols="12"
            xl="1" 
            lg="2" 
            md="12"
            sm="12"
            xs="12">
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
            <v-col 
            cols="12"
            xl="3" offset-xl="3" 
            lg="3" offset-lg="2" 
            md="9"
            sm="10"
            xs="10">
                <v-text-field 
                :label="$t('enterCity')" 
                v-model="enterCity" 
                v-on:keyup.enter="selectCity(enterCity)" 
                hide-details="auto"
                :error-messages="cityError ? $t('cityNotFound') : ''" />
            </v-col>
            <v-col 
            cols="12"
            xl="1" 
            lg="1" 
            md="3"
            sm="2"
            xs="2">
                <v-btn v-on:click="selectCity(enterCity)" min-height="58px" block> {{ $t("enter") }} </v-btn>
            </v-col>
        </v-row>
    
        <v-row justify="center">
            <v-col 
            v-if="citySelected" 
            v-for="place in citySelected.places" 
            :key="place.id" 
            cols="12"
            xs="12"
            sm="6" 
            md="4" 
            lg="3" 
            xl="2">
                <HikingPlaceCard v-bind:place="place" />
            </v-col>
            <v-col v-else xl="6" lg="6" sm="12">
                <v-card variant="outlined" class="pa-4" style="text-align: center;">
                    <h3> {{ $t("nothingSelected") }}</h3> <br />
                    <p> {{ $t("tryInputOrSelect") }}</p>
                </v-card>
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
<template>
    <!-- <v-app-bar id="nav" app color="black" class="mx-auto" v-bind:image=getRandomImageId()> -->
    <v-app-bar id="nav" app color="primary" class="mx-auto">
        <router-link to="/home">
             <v-btn> {{ $t("home") }} </v-btn>
        </router-link>
        <router-link to="/destinations">
             <v-btn> {{ $t("destinations") }} </v-btn>
        </router-link>
        <router-link to="/calendar">
             <v-btn> {{ $t("calendar") }} </v-btn>
        </router-link>
        <!-- <v-toolbar-title> {{ $t("title") }} </v-toolbar-title> -->

        <v-spacer></v-spacer>

        <v-menu offset-y>
            <template #activator="{ props }">
                <v-btn v-bind="props" icon>
                <v-icon>mdi-translate</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="lang in languages" :key="lang.code" @click="setLocale(lang.code)">
                <v-list-item-title>{{ lang.label }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
export default {
    data() {
        return {
            imageIds: [10, 11, 12, 13, 14, 15, 16, 17],
            languages: [
                {label: "Русский", code: "ru"},
                {label: "English", code: "en"}
            ]
        }
    },
    methods: {
        getRandomImageId() {
            const index = Math.floor(Math.random() * this.imageIds.length);
            return `https://picsum.photos/id/${this.imageIds[index]}/1920/1080?blur=2`
        },
        setLocale(code) {
            this.$i18n.locale = code;
        }
    }
}
</script>

<style scoped>
    .router-link-active {
        color: rgb(255, 29, 29)
    }
</style>
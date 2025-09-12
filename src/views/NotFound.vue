<template>
    <v-container class="mt-10">
        <v-row justify="center" class="mb-6">
            <v-col cols="12" md="8" class="text-center">
                <h1>{{ $t("notFound") }}</h1>
                <p>
                    {{ $t("goToHome") }}
                    <router-link to="/">{{ $t("homePage") }}</router-link>
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
h1 {
  margin-bottom: 16px;
}
</style>
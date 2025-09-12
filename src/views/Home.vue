<template>
  <v-container class="mt-10">
    <v-row justify="center" class="mb-6">
      <v-col cols="12" md="8" class="text-center">
        <h1>{{ $t("hike_planner") }}</h1>
        <p>{{ $t("welcome") }}</p>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-6">
      <v-col cols="12" sm="12" md="6" lg="6" xl="3">
        <v-card class="pa-4 text-center" variant="outlined">
          <v-card-title>{{ $t("trails_near_city") }}</v-card-title>
          <v-card-text>{{ $t("trails_description") }}</v-card-text>
          <v-card-actions>
            <v-btn variant="outlined" :to="{ name: 'destinations' }" block>{{ $t("go") }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" md="6" lg="6" xl="3">
        <v-card class="pa-4 text-center" variant="outlined">
          <v-card-title>{{ $t("hike_calendar") }}</v-card-title>
          <v-card-text>{{ $t("calendar_description") }}</v-card-text>
          <v-card-actions>
            <v-btn variant="outlined" :to="{ name: 'calendar' }" block>{{ $t("go") }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

</script>

<style scoped>
h1 {
  margin-bottom: 16px;
}
</style>